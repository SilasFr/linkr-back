import connection from "../database.js";

async function getLikes(postId) {
  return connection.query(
    `
    SELECT "likedPost"."postId", "likedPost"."likeAuthor",
        users.name AS name FROM "likedPost" 
    JOIN users ON users.id = "likedPost"."likeAuthor" 
    WHERE "likedPost"."postId" = $1 
    `,
    [postId]
  );
}

async function searchUserLike(postId, userId) {
  return connection.query(
    `
    SELECT * from "likedPost" WHERE "postId" = $1 AND "likeAuthor" = $2
  `,
    [postId, userId]
  );
}

export const likesRepository = {
  getLikes,
  searchUserLike,
};
