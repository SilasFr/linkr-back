/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */

import connection from '../database.js';

export async function newPost(req, res) {
  const { link, description } = res.locals.newPostData;
  try {
    await connection.query(`
      INSERT INTO posts (author, link, description)
      VALUES (1, $1, $2);
      `, [link, description]);
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send('!erro! cadastrando novo post');
  }
}
