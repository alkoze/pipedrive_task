const express = require('express');
const Service = require('./appService');

const app = express();
const service = new Service();

app.get('/gists/:userName', async (req, res) => {
  try{
    var gists = await service.filterDeals(req.params.userName);
    if (gists.length > 0){
      res.send(gists);
    } else res.send(`No new gists found for user ${req.params.userName}.`);
  } catch (error) {
    res.send(error)
  }
})

app.get('/deals/:userName', async (req, res) => {
  try {
    var responce = await service.postDeals(req.params.userName);
    if (responce.length > 0){
      res.send(responce);
    } else res.send(`No new deals found for user ${req.params.userName}.`);
  } catch (error) {
    res.send(error)
  }
});

app.get('/',  (req, res) => {
  res.send('Hello');
});

app.delete('/users/:userName', async (req, res) => {
  res.send(await service.deleteUser(req.params.userName))
})

app.post('/users/:userName', async (req, res) => {
  res.send(await service.addUser(req.params.userName));
})

app.get('/users', async (req, res) => {
  users = await service.readUsers()
   res.send('Gists are being checked for users: ' + users);
});

setInterval(async function(){
  users = await service.readUsers();
  users.forEach(async username => {
    if (username.length > 0) {
      console.log(`Check new gists for user ${username}.`);
      console.log(await service.postDeals(username));
    }
  });
}, 600000)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}.`))