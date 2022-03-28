import { postsRepository } from "../repositories/postsRepository.js";
import { likesRepository } from "../repositories/likesRepository.js";

export async function getLikesByPostId(req, res) {
  const postId = req.params.id;

  try {
    const postSearch = await postsRepository.getPostById(postId);
    if (postSearch.rows.length === 0)
      return res.status(404).send("Post not found");

    const likesList = await likesRepository.getLikes(postId);

    return res.status(200).send(likesList.rows);
  } catch {
    return res.sendStatus(500);
  }
}
