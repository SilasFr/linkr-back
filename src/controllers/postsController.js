import SqlString from "sqlstring";
import { postsRepository } from "../repositories/postsRepository.js";

export async function getPostsByHashtag(req, res) {
  const hashtag = SqlString.escape(req.params.hashtag);
  const topic = await postsRepository.validateTopic(hashtag);
  console.log(hashtag);
  if (topic.rowCount < 1) {
    res.redirect(404, "/timeline");
  } else {
    res.status(200).send("ae porra");
  }
}
