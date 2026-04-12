import URLRecord from "../models/urlRecordModel.js";
import { generateShortURL } from "../utils/urlHelper.js";
import validator from 'validator';


//1、生成短链接的接口
export async function createURLRecode(req, res){
  //先从请求体中结构出原链接和urlCode
  const { originURL, urlCode } = req.body;

  //如果未提供原链接
  if(!originURL){
    return res.status(400).json({message:'Origin URL is required'});
  }

  //如果原链接不是有效的
  if(!validator.isURL(originURL)){
    return res.status(400).json({message: 'Invalid origin URL'});
  }

  //判断原始链接是否已经生成
  const urlRecord = await URLRecord.findOne({where: { originURL }});
  if(urlRecord){
    return res.status(200).json({message: 'Origin URL already exists', data: urlRecord })
  }

  //如果提供了短链接识别码
  if(urlCode){
    //校验是否存在
    const urlRecord = await URLRecord.findOne({where: {urlCode}});

    //如果urlRecord已存在
    if(urlRecord){
      return res.status(400).json({message:'URL code already exists'});
    }

    //如果识别码不存在，则生成一个短短链接和一个新的连接记录
    const shortURL = await generateShortURL(urlCode);
    const createURLRecord = await URLRecord.create({
      id:Date.now(),
      originURL,
      shortURL,
      urlCode, //短链接识别码
    });

    return res.status(201).json({message: 'URL record created successfully', data: createURLRecord});
  }
  
  const shortURL = await generateShortURL(urlCode);
  const createURLRecord = await URLRecord.create({
    id: Date.now(),
    originURL,
    shortURL,
    urlCode: shortURL.split('/').at(-1) //将短链接转化成数组，取 / 后面的最后一个元素
  });
  return res.status(201).json({message: 'URL record created successfully', data: createURLRecord})
    
}