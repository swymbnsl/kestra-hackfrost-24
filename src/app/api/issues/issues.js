import IssueModel from '../../../models/Issue';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const issues = await IssueModel.find();
      res.status(200).json(issues);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch issues' });
    }
  } else if (req.method === 'POST') {
    try {
      const issue = new IssueModel(req.body);
      await issue.save();
      res.status(201).json(issue);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create issue' });
    }
  }
}
