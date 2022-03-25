import connection from "../database.js";

async function insertPost(userData, postData) {
  const author = userData.id;
  const { link, title, description, image } = postData;

  const { rows: lastLink } = await connection.query(`
    INSERT INTO links (link, title, description, image)
    VALUES ($1, $2, $3, $4)
    RETURNING id;
    `,
    [link, title, description, image]
  );
    
  await connection.query(`
    INSERT INTO posts (author, "linkId", description)
    VALUES ($1, $2, $3);
    `,
    [author, lastLink[0].id, description]
  );
}

async function getPosts() {
  return connection.query(`
        SELECT COUNT(lp.id) AS likes, 
        p.id, l.link, l.title, l.description, 
        l.image, p.description, u.name AS "userName", 
        u."profilePic" FROM posts p
          JOIN "likedPost" lp ON lp."postId" = p.id
          JOIN users u ON u.id = p.author
          JOIN links l ON p."linkId"=l.id
        GROUP BY  p.id, u.id, l.id
        ORDER BY p."createdAt" DESC
        LIMIT 20
    `);
}

async function likePost(postId, userId) {
  await connection.query(
    `
    INSERT INTO "likedPost" ("postId", "likeAuthor")
    VALUES ($1, $2);
    `,
    [ postId, userId]
  );
}

export const postsRepository = {
  insertPost,
  getPosts,
  likePost,
};
