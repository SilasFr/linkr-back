import connection from "../database.js";

async function getPosts() {
  return connection.query(`
        SELECT SUM(lp.id) AS likes, p.link, p.description, u.name AS "userName", u."profilePic" FROM "likedPost" lp
          JOIN posts p ON lp."postId" = p.id
          JOIN users u ON p.author = u.id
        GROUP BY  lp.id, p.id, u.id 
        ORDER BY p.createdat DESC
        LIMIT 20
    `); // trocar campo p.createdat para p."createdAt"
}

export const postsRepository = { getPosts };
