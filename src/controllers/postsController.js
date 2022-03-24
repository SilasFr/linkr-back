import { postsRepository } from "../repositories/postsRepository.js";
import urlMetadata from "url-metadata";

export async function getPosts(req, res) {
  const test = [
    {
      link: "https://suitshop.com/products/premium-black-tuxedo-jacket/",
      description: "blabalabla",
      author: "Joe",
    },
    {
      link: "https://suitshop.com/products/premium-black-tuxedo-jacket/",
      description: "blabalabla",
      author: "Joe",
    },
    {
      link: "https://suitshop.com/products/premium-black-tuxedo-jacket/",
      description: "blabalabla",
      author: "Joe",
    },
  ];
  try {
    const { rows } = await postsRepository.getPosts();

    let result = [];
    test.map((element) => {
      // TROCAR PARA rows.map
      let item = {
        ...element,
      };
      urlMetadata(element.link)
        .then(async function ({ url, title, description, image }) {
          item = { ...item, url, title, description, image };
          result.push(item);
        })
        .catch((error) => console.log("error: ", error));
    });
    setTimeout(() => {
      res.send(result).status(200);
    }, test.length * 500);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}
