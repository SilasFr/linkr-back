import { postsRepository } from "../repositories/postsRepository";

export async function getPosts(req, res) {
  try {
    const { rows } = await postsRepository.getPosts();
    const posts = rows.splice(0, 20);
    res.send(posts).status(200);
  } catch (e) {
    res.status(500).send(e);
  }
}
