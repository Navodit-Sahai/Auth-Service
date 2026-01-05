const UserService = require('../services/userService');

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });

        return res.status(200).json({
            message: 'user created successfully',
            success: true,
            data: response,
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
    
};
const signIn=async(req,res)=>{
    try{
        const response=await userService.signIn(req.body.email,req.body.password);
        return res.status(200).json({
            message: 'Signed In successfully',
            success: true,
            data: response,
            err: {}
        }); 
    }catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}
const isAuthenticated=async(req,res)=>{
    try{
        const token=req.headers['x-access-token'];
        const response=await userService.isAuthenticated(token);
        return res.status(200).json({
            message: 'token verified successfully',
            success: true,
            data: response,
            err: {}
        })

    }catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}
const isAdmin=async (req,res)=>{
    try{
        const response=await userService.isAdmin(req.body.id);
        return res.status(200).json({
            message: 'successfully fetched whether admin or not',
            success: true,
            data: response,
            err: {}
        })
    }catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}

module.exports = { create , signIn,isAuthenticated,isAdmin};
