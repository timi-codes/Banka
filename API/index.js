import config from 'dotenv';
import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import debug from 'debug';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import userRoutes from './routes/user.route';
import accountRoutes from './routes/account.route';
import transactionRoutes from './routes/transaction.route';


config.config();
const app = express();
const port = process.env.PORT || 7888;
const API_VERSION = '/api/v1';

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(json());
app.use(cors());
app.use(`${API_VERSION}/auth`, userRoutes);
app.use(`${API_VERSION}`, accountRoutes);
app.use(`${API_VERSION}`, transactionRoutes);


app.get('/', (req, res) => {
  res.send('App server is running');
});

app.use((err, req, res, next) => {
  if (!err) return next();
  return res.status(500).send('Something broke!');
});

if (!module.parent) {
  app.listen(port, () => {
    debug('development')(`Server is running on port ${port}`);
  });
}

module.exports = app;
