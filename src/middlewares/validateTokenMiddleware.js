import connection from "../database.js";
import { userRepository } from "../repositories/userRepository.js";

export async function validateTokenMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(404);
  } 

  const { rows: sessions } = await connection.query(
    `SELECT * FROM sessions WHERE token=$1`,
    [token]
  );
  const [session] = sessions;
  if (!session) {
    return res.sendStatus(401);
  }

  const { rows: users } = await userRepository.getUserById(session.userId);
  const [user] = users;
  if (!user) {
    return res.sendStatus(401);
  }

  res.locals.user = user;
  next();
}
