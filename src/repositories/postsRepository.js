import connection from "../database.js";

async function getPosts() {
  return connection.query(`
        SELECT * FROM posts ORDER BY createdAt DESC
    `);
}

export const postsRepository = { getPosts };
