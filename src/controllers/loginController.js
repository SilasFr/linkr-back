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
