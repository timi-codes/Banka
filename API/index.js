import express from 'express';
import { json } from 'body-parser';

const app = express();
const port = process.env.PORT || 7888;

app.use(json());

app.get('/', (req, res) => {
  res.send('This app server is running on it own 😀😎😋');
});

if (!module.parent) {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${port}`);
  });
}
