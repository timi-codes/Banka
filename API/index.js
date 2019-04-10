import config from 'dotenv';
import express from 'express';
import { json } from 'body-parser';
import debug from 'debug';
import userRoutes from './routes/user.route';

config.config();
const app = express();
const port = process.env.PORT || 7888;
const API_VERSION = '/api/v1';


app.use(json());
app.use(`${API_VERSION}/auth`, userRoutes);


app.get('/', (req, res) => {
  res.send('This app server is running on it own 😀😎😋');
});

if (!module.parent) {
  app.listen(port, () => {
    debug('development')(`Server is running on port ${port}`);
  });
}

module.exports = app;
