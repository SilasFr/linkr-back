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

async function getPosts(offset, id, hashtag = "") {
  const hashtagQuery =
    hashtag &&
    `JOIN "postsTopics" pt ON p.id=pt."postId"
        JOIN topics t ON pt."topicId"=t.id
        WHERE t.topic=${hashtag}`;
  return connection.query(
    `
    SELECT p.id, p.description, p.author,
    l.link, l.title, l.description, l.image,
    u.name AS "userName", u."profilePic",
    COUNT(c.id) AS "commentQty",
    f."followingUserId", f."followedUserId",
    ARRAY_AGG("likedPost"."likeAuthor") "likesList"
    FROM posts p
      LEFT JOIN "likedPost" on "likedPost"."postId" = p.id
      JOIN users u ON u.id = p.author
      JOIN links l ON p."linkId"=l.id
      LEFT JOIN comments c ON p.id=c."postId"
      JOIN follows f ON f."followingUserId"=$1 AND f."followedUserId"=p.author
      ${hashtagQuery}
    GROUP BY  p.id, u.id, l.id, f.id
    ORDER BY p."createdAt" DESC
    LIMIT 10
    ${offset}
    `,
    [id]
  );
}

async function getPostsByUserId(id) {
  return connection.query(
    `
    SELECT p.id, p.description, p.author,
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

async function deletePostTopics(postId) {
  return connection.query(
    `
    DELETE FROM "postsTopics" WHERE "postsTopics"."postId" IN
      (SELECT posts.id FROM posts WHERE posts.id=$1);
    
    `,
    [postId]
  );
}

async function deletePost(id) {
  return connection.query(
    `
    DELETE FROM posts WHERE id=$1;    
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

async function readComments(userId, postId) {
  return connection.query(
    `
    SELECT c.id, c."postId", u.id AS "authorId", u.name, u."profilePic", c.content,
    CASE WHEN f."followingUserId"= $1
      THEN true ELSE false
    END AS followed,
    CASE WHEN c.author = p.author
      THEN true ELSE false
    END AS "isAuthor"
    FROM comments c
    LEFT JOIN users u ON c.author=u.id
    LEFT JOIN follows f ON u.id=f."followedUserId"
    
    LEFT JOIN posts p ON c."postId"=p.id
    
    WHERE c."postId"=$2
    `,
    [userId, postId]
  );
}
async function coment(authorId, postId, content) {
  return connection.query(
    `
    INSERT INTO comments (author, "postId", content)
    VALUES ($1, $2, $3)
    `,
    [authorId, postId, content]
  );
}

export const postsRepository = {
  validateTopic,
  insertPost,
  getPosts,
  getPostsByUserId,
  getPostById,
  deletePost,
  deletePostTopics,
  findPostId,
  editPostById,
  likePost,
  dislikePost,
  readComments,
  coment,
};
