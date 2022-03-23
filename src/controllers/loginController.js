import { v4 as tokenGenerator } from "uuid";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import { loginRepository } from "../repositories/loginRepository.js";
import { userRepository } from "../repositories/userRepository.js";

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const userSearch = await userRepository.getUserByEmail(email);

    if (userSearch.rows.length === 0) return res.sendStatus(401);

    const encryptedPassword = userSearch.rows[0].password;
    const { id, name, profilePic } = userSearch.rows[0];

    if (bcrypt.compareSync(password, encryptedPassword)) {
      const token = tokenGenerator();

      await loginRepository.createSession(id, token, dayjs().add(1, "day"));

      return res
        .send({ token: token, profilePic: profilePic, name: name })
        .status(200);
    } else {
      return res.sendStatus(401);
    }
  } catch {
    return res.sendStatus(500);
  }
}

export async function getSession(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.sendStatus(404);

  try {
    const now = dayjs().unix();

    const session = await loginRepository.getSession(token);
    if (session.rowCount === 0) return res.sendStatus(404);
    if (now > dayjs(session.rows[0].expiresAt).unix())
      return res.sendStatus(401);
    const userId = session.rows[0].userId;
    const user = (await userRepository.getUserById(userId)).rows[0];

    delete user.id;
    delete user.password;

    return res.send(user).status(200);
  } catch (e) {
    console.log(e);
    res.send(e).status(500);
  }
}
