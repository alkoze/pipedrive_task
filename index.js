const express = require('express');
const Service = require('./appService');

const app = express();
const service = new Service();

app.get('/gists/:username', async (req, res) => {
  try{
    res.send(await service.filterDeals(req.params.username));
  } catch (error) {
    res.send(error)
  }
})

app.get('/deals/:userName', async (req, res) => {
  try {
    var responce = await service.postDeals(req.params.userName);
    console.log('responce here ' + responce);
    res.send(responce);
  } catch (error) {
    res.send(error)
  }
});

setInterval(async function(){
  console.log(`Check new gists for user ${userName}.`)
  service.postDeals(userName)
}, 10000)

const port = process.env.PORT || 3000;
const userName = 'alkoze'

app.listen(port, () => console.log(`Listening on port ${port}.`))