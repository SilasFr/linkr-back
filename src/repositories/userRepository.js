/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */

import connection from '../database.js';

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
    [email],
  );
}

export const userRepository = {
  createUser,
  getUserByEmail,
};
