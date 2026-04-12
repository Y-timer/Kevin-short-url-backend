import cryptoRandomString from 'crypto-random-string';
import URLRecord from '../models/urlRecordModel.js';

const PROJECT_URL = process.env.PROJECT_URL;
const SHORT_URL_LENGTH = Number(process.env.SHORT_URL_LENGTH);

export async function generateShortURL(customURLCode = '') { //生成短链接函数
  if(customURLCode){
    return `${PROJECT_URL}/${customURLCode}`
  }

  let urlCode;

  //随机生成字符串
  while(true){
    urlCode = cryptoRandomString({
      length: SHORT_URL_LENGTH, //生成的短链接的长度
      type: 'url-safe',
    });
    const urlRecord = await URLRecord.findOne({where: {urlCode}});
    if(!urlRecord){
      break;
    }
  }
  return `${PROJECT_URL}/${urlCode}`;
} 
