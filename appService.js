const Deal = require('./DTO/deal');
const pipedrive = require('pipedrive');
const Axios = require('axios');

const defaultClient = pipedrive.ApiClient.instance;

let apiToken = defaultClient.authentications.api_key;
apiToken.apiKey = '9beda10917b50c86fe1035aec615b38d1b5cfd62';

const api = new pipedrive.DealsApi();

const gitHubUrl = 'https://api.github.com'


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
      if (gists != null && gists.length > 0){
          gists.forEach(async element =>
              {await api.addDeal(new Deal(element))});
          console.log(gists);
      }
      else console.log("Zero new gists found.");
    } catch (error) {
      console.log(error);
    }
  }
}