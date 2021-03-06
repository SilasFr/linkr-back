import SqlString from "sqlstring";
import { postsRepository } from "../repositories/postsRepository.js";
import { userRepository } from "../repositories/userRepository.js";
import urlMetadata from "url-metadata";
import { likesRepository } from "../repositories/likesRepository.js";
import { followRepository } from "../repositories/followRepository.js";
// import res from "express/lib/response";

export async function getPostsByHashtag(req, res) {
  let offset = "";
  if (req.query.offset) {
    offset = `OFFSET ${req.query.offset * 10}`;
  }
  const hashtag = SqlString.escape(req.params.hashtag);
  try {
    const { user } = res.locals;
    const topic = await postsRepository.validateTopic(hashtag);
    if (topic.rowCount < 1) return res.status(404).send("timeline");
    const { rows } = await postsRepository.getPosts(offset, user.id, hashtag);
    if (rows.length === 0) {
      return res.send("No posts found from your friends");
    }

    let result = rows.map((element) => ({ ...element }));
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function newPost(req, res) {
  const newPostData = res.locals.newPostData;
  const userData = res.locals.user;

  try {
    const { url, title, image } = await urlMetadata(newPostData.link);
    newPostData.link = url;
    newPostData.title = title;
    newPostData.image = image;

    await postsRepository.insertPost(userData, newPostData);

    return res.sendStatus(201);
  } catch (error) {
    console.log(error, "<< aqui?");
    return res.status(500).send("!erro! cadastrando novo post");
  }
}

export async function getPosts(req, res) {
  let offset = "";
  if (req.query.offset) {
    offset = `OFFSET ${req.query.offset * 10}`;
  }

  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  try {
    const userIdSearch = await userRepository.getUserByToken(token);

    const follows = await followRepository.countFollows(
      userIdSearch.rows[0].userId
    );
    if (follows.rows.length === 1) {
      return res.send("You don't follow anyone yet. Search for new friends!");
    }

    const { rows } = await postsRepository.getPosts(
      offset,
      userIdSearch.rows[0].userId
    );
    if (rows.length === 0) {
      return res.send("No posts found from your friends");
    }

    let result = rows.map((element) => {
      let likedByUser = false;
      if (element.likesList.includes(userIdSearch.rows[0].userId))
        likedByUser = true;
      return { ...element, likedByUser };
    });
    res.send(result).status(200);
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

    let result = search.rows.map((element) => {
      let likedByUser = false;
      if (element.likesList.includes(userId)) likedByUser = true;
      return { ...element, likedByUser };
    });
    res
      .send({ posts: [...result], author: userSearch.rows[0].name })
      .status(200);
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

    await postsRepository.deletePostTopics(postId);
    await postsRepository.deletePost(postId);
    res.sendStatus(200);
  } catch (e) {
    console.log(e, "!!!");
    res.status(500).send(e);
  }
}

export async function editPostById(req, res) {
  try {
    const newPostData = res.locals.newPostData;
    const user = res.locals.user;
    const postId = req.params.id;
    const postData = {
      id: req.params.id,
      description: newPostData.description,
      link: newPostData.link,
    };

    const { rows } = await postsRepository.getPostById(postId);
    const post = rows[0];
    if (user.id !== post.author) {
      return res.status(409);
    }

    await postsRepository.editPostById(postData);

    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e);
  }
}
export async function getPostById(req, res) {
  try {
    const { rows } = await postsRepository.getPostById(req.params.id);
    res.send(rows[0]);
  } catch (e) {
    res.sendStatus(500);
  }
}
export async function likePostById(req, res) {
  try {
    console.log("res.locals: ", res.locals);
    const user = res.locals.user;
    const { id } = req.params;
    if (!user || !id) {
      return res.sendStatus(409);
    }

    const likeSearch = await likesRepository.searchUserLike(id, user.id);

    if (likeSearch.rows.length > 0) return res.sendStatus(409);

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
    return res.sendStatus(500);
  }
}

export async function readCommentsById(req, res) {
  try {
    const { user } = res.locals;
    const { id: postId } = req.params;

    const comments = await postsRepository.readComments(user.id, postId);
    if (comments.rowCount === 0) {
      return res.send([]);
    }
    comments.rows = comments.rows.filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    );
    res.send(comments.rows);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}
export async function insertComment(req, res) {
  const { id } = req.params;
  const user = res.locals.user;
  const { comment } = req.body;
  try {
    const postSearch = await postsRepository.getPostById(id);
    if (postSearch.rows.length === 0) return res.sendStatus(404);

    await postsRepository.coment(user.id, id, comment);
    return res.sendStatus(201);
  } catch {
    return res.sendStatus(500);
  }
}
