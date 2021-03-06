import connectDB from '../../../utils/dbConfig'
import Notes from '../../../models/notes'
import cors from './cors'

connectDB()

export default async (req, res) => {
  await cors(req, res)
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const notes = await Notes.find()
        res.status(200).json({ success: true, data: notes })
      } catch (err) {
        res
          .status(500)
          .json({ success: true, message: 'Internal server error.' })
      }
      break
    case 'POST':
      try {
        const note = await Notes.create(req.body)
        res.status(201).json({ success: true, data: note })
      } catch (err) {
        res
          .status(500)
          .json({ success: true, message: 'Internal server error.' })
      }
      break
    default:
      res.status(500).json({ success: true, message: 'Internal server error.' })
      break
  }
}
