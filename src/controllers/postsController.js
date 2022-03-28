import SqlString from "sqlstring";
import { postsRepository } from "../repositories/postsRepository.js";
import { userRepository } from "../repositories/userRepository.js";
import urlMetadata from "url-metadata";
// import res from "express/lib/response";

export async function getPostsByHashtag(req, res) {
  const hashtag = SqlString.escape(req.params.hashtag);
  try {
    const topic = await postsRepository.validateTopic(hashtag);
    if (topic.rowCount < 1) return res.status(404).send("timeline");
    const { rows } = await postsRepository.getPostsByHashtag();
    if (rows.length === 0) {
      return res.send("There are no posts yet");
    }

    let result = rows.map((element) => ({ ...element }));
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}

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

export async function getPostsByUserId(req, res) {
  const userId = req.params.id;

  try {
    const userSearch = await userRepository.getUserById(userId);
    if (userSearch.rows.length === 0)
      return res.status(404).send("User not found");

    const search = await postsRepository.getPostsByUserId(userId);
    if (search.rows.length === 0) {
      return res.status(200).send("There are no posts yet");
    }

    res.send(search.rows).status(200);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function deletePostById(req, res) {
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
    res.status(500).send(e);
  }
}

export async function likePostById(req, res) {
  try {
    const user = res.locals.user;
    const { id } = req.params;
    if (!user || !id) {
      return res.sendStatus(409);
    }

    await postsRepository.likePost(id, user.id);
  } catch (e) {
    res.sendStatus(500);
  }
}

export async function dislikePostById(req, res) {
  try {
    const { id } = req.params;

    await postsRepository.dislikePost(id);
    res.status(200).send("ok");
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}
