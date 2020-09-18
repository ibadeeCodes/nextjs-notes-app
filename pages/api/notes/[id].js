import connectDB from '../../../utils/dbConfig'
import Notes from '../../../models/notes'
import cors from './cors'

connectDB()

export default async (req, res) => {
  await cors(req, res)
  const {
    query: { id },
    method,
  } = req

  switch (method) {
    case 'GET':
      try {
        const note = await Notes.findById(id)
        res.status(200).json({ success: true, data: note })
      } catch (err) {
        res
          .status(500)
          .json({ success: true, message: 'Internal server error.' })
      }
      break
    case 'PUT':
      try {
        const note = await Notes.findByIdAndUpdate(
          id,
          { ...req.body },
          {
            new: true,
            runValidators: true,
          }
        )
        res.status(201).json({ success: true, data: note })
      } catch (err) {
        res
          .status(500)
          .json({ success: true, message: 'Internal server error.' })
      }
      break
    case 'DELETE':
      try {
        const deletedNote = await Notes.deleteOne({ _id: id })
        res.status(201).json({ success: true, data: deletedNote })
      } catch (err) {
        res
          .status(500)
          .json({ success: true, message: 'Internal server error.' })
      }
    default:
      res.status(500).json({ success: true, message: 'Internal server error.' })
      break
  }
}
