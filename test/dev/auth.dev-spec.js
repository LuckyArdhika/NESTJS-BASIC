const fetcher = require('./lib/fetcher.lib');

// manually coded using fetch
require('dotenv').config();

const reset = '\x1b[0m';
const red = '\x1b[31m';
const green = '\x1b[32m';
const cyan = '\x1b[36m';

const baseUrl = `${process.env.ORIGIN}/api`;

async function Start(){ 
  console.log(`${cyan} ==============  AUTH  ================`);
  await fetcher.setTag("Auth").setTitle("SignIn - Must be error 400").hit(`${baseUrl}/auth/signin`, {method: 'POST', body: {}}).then(async (resp) => {
    if (resp.status != 400) throw Error("Incorrect status code");
    const body = await resp.json();
    if (JSON.stringify(body) !== JSON.stringify({
      data: {},
      statusCode: 400,
      respCode: 'body.BAD_REQUEST',
      error: 'BadRequestException',
      message: 'Input validation failed: email: Required, password: Required, remember_me: Required'
    })) throw Error("Body not equal");
  });

  // await fetcher.setTag("Auth").setTitle("SignIn - Must be error 400").hit(`${baseUrl}/auth/signin`, {method: 'POST', body: {}}).callback((resp) => {
  //   if (resp.status != 400) throw Error();
  // });
}

Start();
