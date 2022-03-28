import connection from "../database.js";

async function getLikes(postId) {
  return connection.query(
    `
    SELECT "likedPost"."postId",
        users.name AS name FROM "likedPost" 
    JOIN users ON users.id = "likedPost"."likeAuthor" 
    WHERE "likedPost"."postId" = $1 
    `,
    [postId]
  );
}

export const likesRepository = {
  getLikes,
};
