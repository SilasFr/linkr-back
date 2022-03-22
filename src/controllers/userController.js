import bcrypt from "bcrypt";

export async function createUser(req, res) {
  try {
    const user = res.locals.user;

    res.send("ok");
  } catch (e) {
    res.status(500).send(e);
  }
}
