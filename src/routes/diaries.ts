import express from "express" //EcmaScript Modules
import * as diaryServices from '../services/diaryServices'
import toNewDiaryEntry from "../utils"

const router = express.Router()

router.get('/', (_req, res) => { //getting json
    res.send(diaryServices.getEntriesWithoutSensitiveInfo())
})

router.get('/:id', (req, res) => { //getting json
    const diary = diaryServices.findById(Number(req.params.id))
    return (diary != null)
    ? res.send(diary)
    : res.sendStatus(404)
})

router.post('/',(req, res) => {
    try {
        const newDiaryEntry = toNewDiaryEntry(req.body)

        const addedDiaryEntry = diaryServices.addDiary(newDiaryEntry)
        res.json(addedDiaryEntry)

    } catch (e) {
        res.status(400).send(e)
    }

})

export default router