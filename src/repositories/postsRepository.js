import connection from "../database.js";

async function insertPost(userData, postData) {
  const author = userData.id;
  const { link, description } = postData;
  
  await connection.query(`
    INSERT INTO posts (author, link, description)
    VALUES ($1, $2, $3);
    `,
    [author, link, description]
  );
}

export const postsRepository = {
  insertPost,
};
