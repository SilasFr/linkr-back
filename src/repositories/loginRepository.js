/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */

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

export const loginRepository = {
  createSession,
};
