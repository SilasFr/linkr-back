import connection from "../database.js";

async function countFollows(sessionUserId) {
  return connection.query(`
    SELECT * FROM follows
    WHERE "followingUserId"=${sessionUserId}
  `)
}

async function insertFollow(sessionUserId, userId) {
  const followingUserId = sessionUserId
  const followedUserId = userId
  await connection.query(
    `
    INSERT INTO follows ("followingUserId", "followedUserId")
    VALUES ($1, $2)
    `,
    [followingUserId, followedUserId]
  );
}

async function removeFollow(sessionUserId, userId) {
    const followingUserId = sessionUserId
    const followedUserId = userId
    await connection.query(
      `
      DELETE FROM follows
      WHERE "followingUserId" = ${followingUserId}
      AND "followedUserId" = ${followedUserId}
      `,
    );
}

async function verifyFollow(sessionUserId, userId) {
  const followingUserId = sessionUserId
  const followedUserId = userId
  return await connection.query(
    `
    SELECT * FROM follows
    WHERE "followingUserId" = ${followingUserId} 
    AND "followedUserId" = ${followedUserId}
    `,
  );
}

export const followRepository = {
    insertFollow,
    removeFollow,
    verifyFollow,
    countFollows
}
