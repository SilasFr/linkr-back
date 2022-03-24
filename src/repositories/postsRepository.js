import connection from "../database.js";

async function getPosts() {
  return connection.query(`
        SELECT p.link, p.description, u.name AS "userName", u."profilePic" FROM "postsTopics" 
          JOIN posts p ON "postsTopics"."postId" = p.id
          JOIN topics ON topics.id = "postsTopics"."topicId"
          JOIN users u ON p.author = u.id
        GROUP BY "postsTopics"."postId"
        ORDER BY createdAt DESC
        LIMIT 20
    `);
}

export const postsRepository = { getPosts };
