import bcrypt from "bcrypt";
import { userRepository } from "../repositories/userRepository.js";

export async function createUser(req, res) {
  try {
    const user = req.body;

    const verifyEmail = await userRepository.getUserByEmail(user.email);
    if (verifyEmail.rowCount > 0) {
      return res.sendStatus(409);
    }

    const password = bcrypt.hashSync(user.password, 10);
    delete user.password;
    await userRepository.createUser({ ...user, password });

    res.sendStatus(201);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function searchUser(req, res) {
  const users = [
    {
      name: "João Amongus",
      image:
        "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png",
    },
    {
      name: "João Avatares",
      image:
        "https://www.kindpng.com/picc/m/21-215449_cabea-o-boneco-avatar-homem-gravata-jaqueta-dummy.png",
    },
  ];

  res.status(200).send(users);
}
