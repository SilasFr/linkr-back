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
    return res.status(500).send("!erro! cadastrando novo post");
  }
}

export async function getPosts(req, res) {
  try {
    const { rows } = await postsRepository.getPosts();
    if (rows.length === 0) {
      return res.send("There are no posts yet");
    }

    let result = rows.map((element) => ({ ...element }));
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function deletePostById(req, res) {
  //  console.log("u got this far");
  try {
    const user = res.locals.user;
    const postId = req.params.id;

    const { rows } = await postsRepository.getPostById(postId);
    const post = rows[0];
    if (user.id !== post.author) {
      return res.status(409);
    }
    await postsRepository.deletePost(postId);

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}
