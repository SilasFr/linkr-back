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

export const hashtagRepository = {
  postHashtag,
  validateHashtag
};
