import UserModel from '../../../models/User';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const users = await UserModel.find().populate('groupId');
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  } else if (req.method === 'POST') {
    try {
      const user = new UserModel(req.body);
      await user.save();
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  }
}
