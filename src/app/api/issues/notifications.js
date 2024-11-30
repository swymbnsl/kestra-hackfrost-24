import NotificationModel from '../../../models/Notification';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const notifications = await NotificationModel.find().populate('userId');
      res.status(200).json(notifications);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch notifications' });
    }
  } else if (req.method === 'POST') {
    try {
      const notification = new NotificationModel(req.body);
      await notification.save();
      res.status(201).json(notification);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create notification' });
    }
  }
}
