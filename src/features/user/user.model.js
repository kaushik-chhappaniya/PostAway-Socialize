import { users } from "../utils/data.js";

class UserModel {
    constructor(name, email, password) {
        this.id = users? users.length + 1 : 1;
        this.name = name;
        this.email = email;
        this.password = password;
    }

     //retrieving all the user
     static getAllUsers(){
        return users;
   }
   
   //creating a new user
   static addUser(name,email,password){
         // const id=users.length+1;
         const newUser = new UserModel(name,email,password);
         users.push(newUser);
         return newUser;
   }

   //Confirm for the login
   static confirmLogin(email,password){
        const res=users.find((u)=> u.email === email && u.password === password);
        if(res) {
           return res;
        } else {
           return null;
        }
   }
}
export default UserModel
