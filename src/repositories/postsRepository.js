import connection from "../database.js";

async function getTopics(hashtag) {
  return connection.query(
    `
    SELECT * FROM topics
    WHERE topics.topic=$1
    `,
    [hashtag]
  );
}

async function getPostsByHashtag(hashtag) {
  return connection.query(
    `
    SELECT p.author, p.description, p.link
      FROM posts p
      JOIN "postsTopics" pt ON p.id=pt."postId"
      JOIN topics t ON pt."topicId"=t.id
      WHERE t.topic=$1
    `,
    [hashtag]
  );
}

export const postsRepository = {
  getTopics,
  getPostsByHashtag,
};
