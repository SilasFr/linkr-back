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
    // const { rows } = await postsRepository.getPosts();
    // const posts = rows.splice(0, 20);
    // res.send(posts).status(200);
    let time;
    let result = [];
    test.map((element) => {
      urlMetadata(element.link)
        .then(async function ({ url, title, description, image }) {
          let item = { url, title, description, image };
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

// export async function getPosts(req, res) {
//   const userToken = req.headers.authorization.replaceAll('Bearer ', '');
//   try {
//     const { rows: existentToken } = await connection.query(`
//       SELECT * FROM sessions WHERE token=$1
//     `, [userToken]);
//     if (existentToken.length === 0) {
//       return res.status(404).send('!erro! token invalido ou expirado');
//     }

//     const allPosts = await connection.query(`
//       SELECT * FROM posts;
//     `);
//     return res.status(200).send(allPosts.rows);
//   } catch (error) {
//     return res.status(500).send('!erro! obtendo posts');
//   }
// }
