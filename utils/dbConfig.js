import mongoose from 'mongoose'

let connection = {}

const connectDB = async () => {
  try {
    if (connection.isConnected) {
      return
    }
    const db = await mongoose.connect(process.env.mongo_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    connection.isConnected = db.connections[0].readyState

    console.log('MongoDB Connected!')
  } catch (err) {
    console.log(err.message)
  }
}

export default connectDB
