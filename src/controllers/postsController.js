/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */

import connection from '../database.js';

export async function newPost(req, res) {
  const { link, description } = res.locals.newPostData;
  console.log('reached Controller: ', res.locals);
  try {
    return res.sendStatus(501);
  } catch (error) {
    return res.status(500).send('!erro! cadastrando novo post');
  }
}
