import connection from "../database.js";

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

async function getPosts() {
  return connection.query(`
        SELECT p.id, p.description, 
          l.link, l.title, l.description, l.image,
          u.name AS "userName", u."profilePic"
        FROM posts p
          JOIN users u ON u.id = p.author
          JOIN links l ON p."linkId"=l.id
        GROUP BY  p.id, u.id, l.id
        ORDER BY p."createdAt" DESC
        LIMIT 20
    `);
}

async function getPostsByUserId(id) {
  return connection.query(
    `
    SELECT p.id, p.description, 
      l.link, l.title, l.description, l.image,
      u.name AS "userName", u."profilePic"
    FROM posts p
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
  return connection.query(`
    SELECT p.id FROM posts p WHERE p.author=$1 ORDER BY id DESC LIMIT 1
  `, [userId]);
}

export const postsRepository = {
  insertPost,
  getPosts,
  getPostsByUserId,
  getPostById,
  deletePost,
  findPostId,
};
