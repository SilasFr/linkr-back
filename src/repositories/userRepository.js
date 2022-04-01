import connection from "../database.js";

async function createUser({ userName, email, password, pictureUrl }) {
  return connection.query(
    `
    WITH new_user AS(
      INSERT INTO users
      (name, email, password, "profilePic")
      VALUES
      ($1, $2, $3, $4)
      RETURNING id AS user_id
    )
    INSERT INTO follows
      ("followingUserId", "followedUserId")
      SELECT user_id, user_id
    FROM new_user
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
async function searchUser(name) {
  return connection.query(
    `
    SELECT u.id, u.name, u."profilePic"
    FROM users u
    WHERE u.name ilike '${name + "%"}'
    `
  );
}

async function searchExactUserName(name) {
  return connection.query(
    `
    SELECT users.id, users.name
    FROM users
    WHERE name=$1;
    `,
    [name]);
}

export const userRepository = {
  createUser,
  getUserByEmail,
  getUserById,
  getUserByToken,
  searchUser,
  searchExactUserName,
};
