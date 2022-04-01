import connection from "../database.js";
import { hashtagPostsRepository } from "../repositories/hashtagPostsRepository.js";
import { hashtagRepository } from "../repositories/hashtagRepository.js";
import { postsRepository } from "../repositories/postsRepository.js";

export async function insertHashtag(req, res) {
  const { hashtags, token } = req.body;
  try {
    const hashtagsFiltered = [...hashtags];
    for (let i = 0; i < hashtags.length; i++) {
      let count = 0;
      const hashtagAlreadyExists = await hashtagRepository.validateHashtag(
        hashtagsFiltered[count]
      );
      if (hashtagAlreadyExists.rows.length !== 0) {
        hashtagsFiltered.splice(count, 1);
      }
      count++;
    }

    for (let i = 0; i < hashtagsFiltered.length; i++) {
      await hashtagRepository.postHashtag(hashtagsFiltered[i]);
    }

    const userId = await connection.query(
      `
      SELECT s."userId" FROM sessions s WHERE s.token=$1
    `,
      [token]
    );

    const postId = await postsRepository.findPostId(userId.rows[0].userId);

    for (let i = 0; i < hashtags.length; i++) {
      const hashtagId = await hashtagRepository.findHashtagId(hashtags[i]);
      await hashtagPostsRepository.insertHashtagPost(
        postId.rows[0].id,
        hashtagId.rows[0].id
      );
    }

    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function getHashtags(req, res) {
  try {
    const { rows } = await hashtagRepository.getHashtags();
    if (rows.length === 0) {
      return res.send("There are no trending hashtags");
    }

    let result = rows.map((element) => ({ ...element }));
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
}
