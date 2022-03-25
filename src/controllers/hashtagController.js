import { hashtagRepository } from "../repositories/hashtagRepository.js"

export async function insertHashtag(req, res) {
  const { hashtags } = req.body;
  try {

    const hashtagsFiltered = [...hashtags];
    
    for (let i = 0; i < hashtags.length; i++) {
      let count = 0;
      const hashtagAlreadyExists = await hashtagRepository.validateHashtag(hashtagsFiltered[count]);
  
      if(hashtagAlreadyExists.rows.length !== 0) {
        hashtagsFiltered.splice(count, 1);
      }
      count ++;
    }

    for (let i = 0; i < hashtagsFiltered.length; i++) {
      await hashtagRepository.postHashtag(hashtagsFiltered[i]);
    }
    
    return res.sendStatus(200);
  } catch (error){
    console.log(error)
    return res.sendStatus(500);
  }
}