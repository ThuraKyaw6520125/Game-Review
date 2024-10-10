import dbConnect from '../../lib/mongoose';
import Item from '../../models/Item';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { method } = req;

  // Connect to the database
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const items = await Item.find({});
        res.status(200).json({ success: true, data: items });
      } catch (error) {
        res.status(400).json({ success: false, error: 'Failed to fetch items' });
      }
      break;

    case 'POST':
      try {
        const { title, description } = req.body;
        const newItem = await Item.create({ title, description });
        res.status(201).json({ success: true, data: newItem });
      } catch (error) {
        res.status(400).json({ success: false, error: 'Failed to create item' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.body; // Extract the item ID from the request body
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ success: false, error: 'Invalid ID' });
        }
        const deletedItem = await Item.findByIdAndDelete(id);
        if (!deletedItem) {
          return res.status(404).json({ success: false, error: 'Item not found' });
        }
        res.status(200).json({ success: true, data: deletedItem });
      } catch (error) {
        res.status(400).json({ success: false, error: 'Failed to delete item' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).json({ success: false, message: `Method ${method} Not Allowed` });
      break;
  }
}
