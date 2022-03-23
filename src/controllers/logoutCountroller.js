import { logoutRepository } from "../repositories/logoutRepository.js";

export async function logout(req, res) {
  const { token } = req.body;

  console.log(token)

  try {
    await logoutRepository.expireSession(token);
    
    return res.sendStatus(200);
  } catch {
    return res.sendStatus(500);
  }
}
