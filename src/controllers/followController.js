import { followRepository } from "../repositories/followRepository.js";

export async function insertFollow(req, res) {
    const { sessionUserId, userId } = req.body
    try {
        await followRepository.insertFollow(sessionUserId, userId)
        return res.sendStatus(200)
    } catch (error) {
        return res.sendStatus(500)
    }
}

export async function removeFollow(req, res) {
    const { sessionUserId, userId } = req.body
    try {
        await followRepository.removeFollow(sessionUserId, userId)
        return res.sendStatus(200)
    } catch (error) {
        return res.sendStatus(500)
    }
}

export async function verifyFollow(req, res) {
    const { sessionUserId, userId } = req.body
    try {
        const userAlreryFollows = await followRepository.verifyFollow(sessionUserId, userId)
        res.status(200).send(userAlreryFollows)
    } catch (error) {
        return res.sendStatus(500)
    }
}

