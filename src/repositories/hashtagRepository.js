import connection from "../database.js";

async function postHashtag( hashtagArray ) {
  return connection.query(
    `
    INSERT INTO topics (topic)
    VALUES($1)
  `,
    [hashtagArray]
  );
}

async function validateHashtag( hashtagArray ) {
  return connection.query(
    `
    SELECT * FROM topics
    WHERE topic=$1
  `,
    [hashtagArray],
  );
}

async function findHashtagId(hashtagName) {
  return connection.query(`
    SELECT * FROM topics WHERE "topic"=$1
  `, [hashtagName]);
}

async function getHashtags() {
  return connection.query(`
    SELECT 
      t.*,
      pt."topicId" AS "topicId",
      COUNT(pt."topicId") AS "topicCount"
    FROM topics as t
      JOIN "postsTopics" AS pt ON pt."topicId"=t.id
    GROUP BY pt."topicId", t.id
    ORDER BY "topicCount" DESC
    LIMIT 10
  `)
}

export const hashtagRepository = {
  postHashtag,
  validateHashtag,
  findHashtagId,
  getHashtags,
};
