import connection from '../database.js';

async function createSession(userId, token, expiresAt) {
  return connection.query(
    `
    INSERT INTO sessions ("userId", token, "expiresAt")
    VALUES ($1, $2, $3)
  `,
    [userId, token, expiresAt]
  );
}
async function getSession(token) {
  return connection.query(
    `
    SELECT * FROM sessions s
    WHERE s.token=$1
    `,
    [token]
  );
}

export const loginRepository = {
  createSession,
  getSession,
};
