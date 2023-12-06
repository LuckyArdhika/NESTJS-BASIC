require('dotenv').config();

const reset = '\x1b[0m';
const red = '\x1b[31m';
const green = '\x1b[32m';
const cyan = '\x1b[36m';

class Fetcher {
 
  title = '';
  tag = '';

 async hit(url, fetchOptions){
    try {
      console.time();
      console.log("-----------------------"+ new Date().toLocaleString());
      console.log(`${green}[${this.tag} - ${cyan}${fetchOptions.method}${green}] ${reset}${this.title}: ${green}${new URL(url).pathname}${reset}`);
      const res = await fetch(url, fetchOptions);
      console.timeEnd();
      console.log("----------------------------------------");
      return res;
    } catch (err) {
      console.timeEnd();
      console.error(`${red}[!: ${this.title}] Error: `, err);
    }
  }

  setTitle(title){
    this.title = title;
    return this;
  }

  setTag(tag){
    this.tag = tag;
    return this;
  }
}

const fetcher = new Fetcher();
module.exports = fetcher;