import { postsRepository } from "../repositories/postsRepository.js";
import urlMetadata from "url-metadata";

export async function newPost(req, res) {
  const newPostData = res.locals.newPostData;
  const userData = res.locals.user;
  
  const { url, title, image } = await urlMetadata(newPostData.link);
  newPostData.link = url;
  newPostData.title = title;
  newPostData.image = image;

  try {
    await postsRepository.insertPost(userData, newPostData);
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send("!erro! cadastrando novo post");
  }
}

export async function getPosts(req, res) {
  try {
    const { rows } = await postsRepository.getPosts();

    let result = rows.map((element) => ({ ...element }));
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}
