const express = require('express');
const fetch = require('isomorphic-fetch');
const opn = require('opn');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: '*'
}));
const port = process.env.PORT || 3000;;

app.get('/', (req, res) => {
  if(req.query.image){
    const imageUrl = req.query.image;
    fetch(imageUrl)
      .then(response => response.buffer())
      .then(buffer => {
        res.send({
          status: true,
          base64: 'data:image/jpg;base64,'+buffer.toString('base64')
        });
      })
      .catch(error => {
        res.status(500).send({
          status: false,
          base64: 'Internal Server Error: '+ error
        });
      });
  }else{
    res.send({
      status: false,
      base64: 'No image linked.'
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
