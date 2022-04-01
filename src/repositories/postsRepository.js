import connection from "../database.js";

async function validateTopic(hashtag) {
  return connection.query(
    `
    SELECT * FROM topics
    WHERE topics.topic=${hashtag}
    `
  );
}
async function insertPost(userData, postData) {
  const author = userData.id;
  const { link, title, description, image } = postData;

  const { rows: lastLink } = await connection.query(
    `
    INSERT INTO links (link, title, description, image)
    VALUES ($1, $2, $3, $4)
    RETURNING id;
    `,
    [link, title, description, image]
  );

  await connection.query(
    `
    INSERT INTO posts (author, "linkId", description)
    VALUES ($1, $2, $3);
    `,
    [author, lastLink[0].id, description]
  );
}

async function getPosts(userId, hashtag = "") {
  const hashtagQuery =
    hashtag &&
    `JOIN "postsTopics" pt ON p.id=pt."postId"
        JOIN topics t ON pt."topicId"=t.id
        WHERE t.topic=${hashtag}`;
  return connection.query(
    `
    SELECT *
    FROM(
   SELECT p.id , p.description, p.author,
     rp."postId" as "repostId", rp."reposterId", COUNT(rp."postId") AS "timesReposted",
         l.link, l.title, l.description, l.image,
         u.name AS "userName", u."profilePic",
         ARRAY_AGG(lp."likeAuthor") "likesList"
       
   FROM posts p
 
   LEFT JOIN "likedPost" lp ON lp."postId" = p.id
   JOIN users u ON u.id = p.author 
   JOIN links l ON p."linkId"=l.id
   LEFT JOIN reposts rp ON rp."postId"=p.id
   ${hashtagQuery}
 
   WHERE p.author=(SELECT "followedUserId" FROM follows WHERE "followingUserId"=$1) 
   GROUP BY p.id, u.id, l.id, rp.id
 
   UNION ALL 
 
   SELECT p.id, p.description, p.author,
     rp."postId" as "repostId", rp."reposterId", COUNT(rp."postId") AS "timesReposted",
         l.link, l.title, l.description, l.image,
         u.name AS "userName", u."profilePic",
         ARRAY_AGG(lp."likeAuthor") "likesList"
 
   FROM reposts rp
   JOIN posts p ON p.id = rp."postId"
   LEFT JOIN "likedPost" lp ON lp."postId" = p.id
     JOIN users u ON u.id = p.author 
     JOIN links l ON p."linkId"=l.id
     ${hashtagQuery}
 
   WHERE rp."reposterId"=(SELECT "followedUserId" FROM follows WHERE "followingUserId"=$1)
 
   GROUP BY p.id, u.id, l.id, rp.id
 ) AS "postsAndReposts" LIMIT 20;
    `,
    [userId]
  );
}

async function getPostsByUserId(id) {
  return connection.query(
    `
    SELECT p.id, p.description, 
    l.link, l.title, l.description, l.image,
     u.name AS "userName", u."profilePic",
     ARRAY_AGG("likedPost"."likeAuthor") "likesList"
    FROM posts p
      LEFT JOIN "likedPost" on "likedPost"."postId" = p.id
      JOIN users u ON u.id = p.author
      JOIN links l ON p."linkId"=l.id
      WHERE u.id=$1
    GROUP BY  p.id, u.id, l.id
    ORDER BY p."createdAt" DESC
    LIMIT 20
    `,
    [id]
  );
}

async function getPostById(id) {
  return connection.query(
    `
    SELECT * FROM posts WHERE id = $1
  `,
    [id]
  );
}

async function deletePost(id) {
  return connection.query(
    `
  DELETE FROM posts 
  WHERE id=$1
`,
    [id]
  );
}

async function findPostId(userId) {
  return connection.query(
    `
    SELECT p.id FROM posts p WHERE p.author=$1 ORDER BY id DESC LIMIT 1
  `,
    [userId]
  );
}

async function editPostById(postData) {
  const { id, description } = postData;

  await connection.query(
    `
    UPDATE posts 
    SET description=$1
    WHERE id=$2
    `,
    [description, id]
  );
}
async function likePost(id, userId) {
  return connection.query(
    `
      INSERT INTo "likedPost"
        ("postId", "likeAuthor")
        VALUES
        ($1, $2)
  `,
    [id, userId]
  );
}

async function dislikePost(id) {
  return connection.query(
    `
    DELETE FROM "likedPost" WHERE "postId"=$1
  `,
    [id]
  );
}

async function insertRepost(userId, postId) {
  return connection.query(
    `
    INSERT INTO reposts ("reposterId", "postId")
    VALUES ($1, $2)
  `,
    [userId, postId]
  );
}

export const postsRepository = {
  validateTopic,
  insertPost,
  getPosts,
  getPostsByUserId,
  getPostById,
  deletePost,
  findPostId,
  editPostById,
  likePost,
  dislikePost,
  insertRepost,
};
