import { postsRepository } from "../repositories/postsRepository.js";
import urlMetadata from "url-metadata";

export async function getPosts(req, res) {
  try {
    const { rows } = await postsRepository.getPosts();

    let result = [];
    rows.map((element) => {
      let item = {
        ...element,
      };
      urlMetadata(element.link)
        .then(async function ({ url, title, description, image, og }) {
          item.link = {
            url,
            title,
            description,
            image,
            secondaryImg: og?.image,
          };

          result.push(item);
        })
        .catch((error) => console.log("error: ", error));
    });
    setTimeout(() => {
      res.send(result).status(200);
    }, rows.length * 500);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}
