import jwt from 'jsonwebtoken';
import UserModel from './user.model.js';
import { ApplicationError } from '../../errorHandler/applicationError.js';

const MYSECRETKEY = 'THISISJWTSeCreTK^Y';
class UserController {
    static getAllUsers = (req, res) => {
        try {
            const allUsers = UserModel.getAllUsers();
            return allUsers;
        } catch (err) {
            console.error(err);
            throw new ApplicationError('Something went wrong with the Data',500);
    }
}

static getRegister = (req, res) => {
    try{
        const {name, email, password} = req.body;
        // const hashPassword=bcrypt.hash(password,12);
        const user = UserModel.addUser(name,email,password);
        res.status(200).send(user);
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

static getLogin = (req,res) => {
        try { 
          const {email,password} = req.body;
          const result = UserModel.confirmLogin(email,password);
          if(result) {
              const token = jwt.sign(
                   {
                      userId: result.id,
                      email: result.email
                  },
                  MYSECRETKEY,
                  {
                    expiresIn:'1h'
                  }
              )
              res.status(200).send(token);
          }else{
              res.status(400).send("Login Failed Incorrect Credentials! Try Again")
          }
      }catch(err){
          console.log(err);
          throw new ApplicationError('Something went wrong with the DataBase ',500);
      }
      }
}

export default UserController;
