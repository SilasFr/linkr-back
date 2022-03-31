import connection from "../database.js";

async function createUser({ userName, email, password, pictureUrl }) {
  return connection.query(
    `
    INSERT INTO users
        (name, email, password, "profilePic")
        VALUES
        ($1, $2, $3, $4)
    `,
    [userName, email, password, pictureUrl]
  );
}

async function getUserByEmail(email) {
  return connection.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [email]
  );
}

async function getUserByToken(token) {
  return connection.query(
    `
    SELECT "userId" FROM sessions WHERE token=$1
  `,
    [token]
  );
}

async function getUserById(id) {
  return connection.query(
    `
    SELECT * FROM users
    WHERE id=$1
    `,
    [id]
  );
}
async function searchUser(userId, name) {
  return connection.query(
    `
    SELECT u.id, u.name, u."profilePic",
    CASE WHEN f."followingUserId" = $1 THEN true ELSE false END as followed
    FROM users u
    LEFT JOIN follows f ON u.id=f."followedUserId"
    WHERE u.name ilike '${name + "%"}'
    LIMIT 10
    `,
    [userId]
  );
}

async function searchExactUserName(name) {
  return connection.query(
    `
    SELECT users.id, users.name
    FROM users
    WHERE name=$1;
    `,
    [name]
  );
}

export const userRepository = {
  createUser,
  getUserByEmail,
  getUserById,
  getUserByToken,
  searchUser,
  searchExactUserName,
};
