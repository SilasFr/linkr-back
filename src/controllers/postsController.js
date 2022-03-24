import { postsRepository } from '../repositories/postsRepository.js';

export async function newPost(req, res) {
  const newPostData = res.locals.newPostData;
  const userData = res.locals.user;
  try {
    await postsRepository.insertPost(userData, newPostData);
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send('!erro! cadastrando novo post');
  }
}