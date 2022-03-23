import connection from "../database.js";

async function expireSession(token) {
  return connection.query(
    `
    UPDATE sessions
    SET "expiresAt" = NOW()
    WHERE token = $1
  `,
    [token]
  );
}

export const logoutRepository = {
  expireSession,
};
