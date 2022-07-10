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

app.get('/',  (req, res) => {
  res.send('Hello');
});

app.get('/users', async (req, res) => {
  users = await service.readUsers()
   res.send('Gists are being checked for users: ' + users);
});

setInterval(async function(){
  users = await service.readUsers();
  users.forEach(async username => {
    console.log(`Check new gists for user ${username}.`);
    await service.postDeals(username);
  });
}, 100000)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}.`))