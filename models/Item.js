import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Item || mongoose.model('Item', ItemSchema);
