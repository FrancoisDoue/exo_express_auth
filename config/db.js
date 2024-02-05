import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI)

const db = mongoose.connection

db.on(
    'error', console.error.bind(console, 'connection error : ')
).once(
    'open', () => {console.log('MongoDB connected with success')}
)

export default db