import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/videosAndResponses');

export default mongoose.connection;