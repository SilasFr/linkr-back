/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */

import connection from '../database.js';

export async function newPost(req, res) {
  const { link, description } = res.locals.newPostData;
  const userToken = req.headers.authorization.replaceAll('Bearer ', '');
  try {
    const { rows: existentToken } = await connection.query(`
      SELECT * FROM sessions WHERE token=$1
    `, [userToken]);
    if (existentToken.length === 0) {
      return res.status(404).send('!erro! token invalido ou expirado');
    }
    await connection.query(`
      INSERT INTO posts (author, link, description)
      VALUES (1, $1, $2);
      `, [link, description]);
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send('!erro! cadastrando novo post');
  }
}

export async function getPosts(req, res) {
  const userToken = req.headers.authorization.replaceAll('Bearer ', '');
  try {
    const { rows: existentToken } = await connection.query(`
      SELECT * FROM sessions WHERE token=$1
    `, [userToken]);
    if (existentToken.length === 0) {
      return res.status(404).send('!erro! token invalido ou expirado');
    }

    const allPosts = await connection.query(`
      SELECT * FROM posts;
    `);
    return res.status(200).send(allPosts.rows);
  } catch (error) {
    return res.status(500).send('!erro! obtendo posts');
  }
}
