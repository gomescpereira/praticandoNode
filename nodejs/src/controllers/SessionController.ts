import { UsersService }  from '../../src/services/UsersService';
//import bcrypt from 'bcryptjs';


class SessionController {

 async store(req, res) {
   const { email, password } = req.body
   //console.log('Controller', email , password);

   const userService = new UsersService(); 
   const usuario = await userService.findEmail(email);

   console.log('Controller',usuario);
      
  if(!usuario) {
    return res.status(401).json({ message: 'User not found'});
  }
    

  
  //const check = await bcrypt.compare(password, usuario.password_hash);
  const check = await  usuario.getcheckPassword(password);
  //console.log('CHECK',check);
  
    
  if(!check) {
      return res.status(401).json({ message: 'Incorrect password' });

  }       
   
   
// Se não colocar o "send" ele não envia e fica esperando a resposta e nunca chega no teste

   return res.json({
       usuario,
       token: await usuario.getgenerateToken()
   });

    // return res.status(200).send();
 }

 async show(req,res) {
   return res.send({message: 'chegou'});
 }

}

export default new SessionController();

