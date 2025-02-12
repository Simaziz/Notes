import connectToDatabase from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const db = await connectToDatabase();
    const data = await db.model('YourModel').find({});
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Unable to connect to database' });
  }
}