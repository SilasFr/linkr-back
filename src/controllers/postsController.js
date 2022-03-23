import { postsRepository } from "../repositories/postsRepository";

export async function getPostsByHashtag(req, res) {
  const topic = req.params.hashtag;

  const topicExists = await postsRepository.getTopics(topic);
}
