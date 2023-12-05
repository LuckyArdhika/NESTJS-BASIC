// manually coded using fetch
require('dotenv').config();

const reset = '\x1b[0m';
const red = '\x1b[31m';
const green = '\x1b[32m';
const cyan = '\x1b[36m';

const baseUrl = `${process.env.ORIGIN}/api`;

async function Start(){ 
  try {

    console.log(`${cyan} ==============  AUTH  ================`);
    console.log("---------------------------------------------");
    const signinUrl = `${baseUrl}/auth/signin`;
    console.log(`${green}[Auth] ${reset}SignIn: ${green}${signinUrl}${reset}`);
    const res = await fetch(signinUrl, {method: 'POST', body: {}});
    console.log(`Res: `, res);
    console.log("---------------------------------------------");
  } catch (err) {
    console.error(`${red}[!] Error: `, err);
  }
}

Start();
