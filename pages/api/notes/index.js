import connectDB from '../../../utils/dbConfig'
import Notes from '../../../models/notes'

connectDB()

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
})

export default async (req, res) => {
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
