const UserRepository=require('../repositories/user-repository');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const {JWT_KEY}=require('../config/serverConfig');
class UserService{
    constructor(){
        this.userRepository=new UserRepository();
    }
    async create(data){
        try{
            const user=await this.userRepository.create(data);
            return user;
        }catch(error){
            console.log(error.message);
            throw error;
        }
    }

    async signIn(email,plainPassword){
        try{
            const user=await this.userRepository.getByEmail(email);
            const passwordsMatch=await this.checkPassword(plainPassword,user.password);
            if(!passwordsMatch){
                console.log("password doesnot match");
                throw {error:'incorrect credentials'};
            }
            const newJwt= this.createToken({email:user.email,id:user.id});
            return newJwt;

        }catch(error){
            console.log("something went wrong during signin");
            console.log(error.message);
            throw error;
        }
    }
    async getById(userId){
        try{

        }catch(error){
            console.log(error.message);
            throw error;
        }
    }
    async isAuthenticated(token){
        try{
            const response=await this.verifyToken(token);
            if(!response){
                throw {error:'invalid token'};
            }
            const user=await this.userRepository.getById(response.id);
            if(!user){
                throw {error:'no user with this credentials'};

            }
            return user.id;
        }catch(error){
            console.log(error.message);
            throw error;
        }
    }
    async isAdmin(userId){
        try{
            return this.userRepository.isAdmin(userId);
        }catch(error){
            console.log(error.message);
            throw error;
        }
    }
    
    createToken(user){
        try{
            const result=jwt.sign(user,JWT_KEY,{expiresIn:'1h'});
            return result;
        }catch(error){
            console.log("something went wrong in token creation");
            console.log(error.message);
            throw error;
        }
    }
    verifyToken(token){
        try{
            const response=jwt.verify(token,JWT_KEY);
            return response;
        }catch(error){
            console.log('something went wrong in token verification');
            console.log(error.message);
            throw error;
        }
    }
    checkPassword(userInputPlainPassword,encryptedPassword){
        try{
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword)
        }catch(error){
            console.log('something went wrong in password comparison');
            console.log(error.message);
            throw error;
        }
    }
}
module.exports=UserService;