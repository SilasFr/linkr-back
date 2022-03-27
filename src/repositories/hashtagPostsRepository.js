import connection from "../database.js";

async function insertHashtagPost(postId, hashtagId) {
    return await connection.query(`
        INSERT INTO "postsTopics" ("postId", "topicId")
            VALUES (${postId}, ${hashtagId})
    `);
}

export const hashtagPostsRepository = {
    insertHashtagPost,
}