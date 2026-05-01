const express = require('express');
const app = express();

app.use(express.json());

app.get('/slow', async (req, res, next) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      throw new Error('Something went wrong');
    } catch (err) {
      next(err);
    }
  });

port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
