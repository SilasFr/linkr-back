import { connection } from "./database.js";

async function getUser(email) {
  return connection.query(
    `
            SELECT * FROM users where email=$1
        `,
    [email]
  );
}

async function createSession(token, userId) {
  return connection.query(
    `
    INSERT INTO sessions (userId, token, creationTime)
    VALUES ($1, $2, $3)
  `,
    [userId, token, creationTime]
  );
}

export const loginRepository = {
  getUser,
  createSession,
};
