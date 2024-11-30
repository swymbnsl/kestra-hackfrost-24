import GroupModel from '../../../models/Group';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const groups = await GroupModel.find().populate('members');
      res.status(200).json(groups);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch groups' });
    }
  } else if (req.method === 'POST') {
    try {
      const group = new GroupModel(req.body);
      await group.save();
      res.status(201).json(group);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create group' });
    }
  }
}
