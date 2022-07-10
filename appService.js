const Deal = require('./DTO/deal');
const pipedrive = require('pipedrive');
const Axios = require('axios');
const {readFileSync, promises: fsPromises} = require('fs');

const defaultClient = pipedrive.ApiClient.instance;

let apiToken = defaultClient.authentications.api_key;
apiToken.apiKey = '9beda10917b50c86fe1035aec615b38d1b5cfd62';

const api = new pipedrive.DealsApi();

const gitHubUrl = 'https://api.github.com'

const userFile = './users.txt';

const axios = Axios.create(
  {
      baseURL: gitHubUrl,
  }
)

module.exports = class Service {
  async getDeals() {
    const deals = await api.getDeals();
    var dealNames = new Array();
    deals.data.forEach(element => {dealNames.push(element.title)})
    return dealNames;
  }
  
  async filterDeals(userName) {
    var gists = await this.getGists(userName);
    var deals = await this.getDeals();
    if (gists instanceof Array && deals instanceof Array){
      gists = gists.filter(val => !deals.includes(val));
      return gists;
    }
    return null
  }

  async getGists(userName) {
    try {
      const responce = await axios.get(`/users/${userName}/gists`);
      if (responce.status === 200 ) {
        var gists = new Array();
        responce.data.forEach(element => {
          gists.push(element.html_url)
        });
        return gists;
      }
    } catch (error) { 
        return String(error);
      }
  }
  
  async postDeals(userName) {
    try {
      var gists = await this.filterDeals(userName);
      if (gists != null){
          gists.forEach(async element =>
              {await api.addDeal(new Deal(element))});
          console.log(gists);
          return gists;
      } else return null;
    } catch (error) {
      console.log(error);
    }
  }

  async addUser(userName) {
    var users = await this.readUsers();
    for (var i = 0; i < users.length ; i++) {
      if (users[i] == userName){
        return `User ${userName} already in list.`
      }
    }
    await fsPromises.appendFile(userFile, `${userName}\n`);
    return `User ${userName} added.`
  }

  async deleteUser(userName) {
    var data = await fsPromises.readFile(userFile, 'utf-8');
    var updatedData = data.replace(`${userName}\n`, '')
    await fsPromises.writeFile(userFile, updatedData);
    return `${userName} deleted.`
  }

  async readUsers() {
    const users = await fsPromises.readFile(userFile, 'utf-8');
    const arr = users.split(/\r?\n/);
    return arr;
  }
}