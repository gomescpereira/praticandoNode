import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export default async (req,res,next) => {
  const authHeader = req.headers.authorization;
  
  if(!authHeader) {
        return res.status(401).json({ message: 'Token not provided' })
  }

  //console.log( authHeader);  

  const [ , token] = authHeader.split(" ");

  //console.log('Token',token);
 

  try {
        const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);
        console.log('Decoded',decoded);
        req.userId = decoded.id;
        return next();

  } catch (err) {
      return res.status(401).json({ message: 'Token invalid' })
  }  
                     
  return next();
} 
