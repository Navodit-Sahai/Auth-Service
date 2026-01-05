const express=require("express");
const bodyParser=require('body-parser');
const app=express();
const {PORT}=require('./config/serverConfig');
const apiRoutes=require('./routes/index');
const db=require('./models/index');
const {User}=require('./models/index');
const {Role}=require('./models/index');


const prepareAndStartServer=()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',apiRoutes);
    app.listen(PORT,async ()=>{
        console.log(`server started on ${PORT}`);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter:true});
        }
        // const u1=await User.findByPk(4);
        // const r1=await Role.findByPk(2);
        // u1.addRole(r1);
    })
}
prepareAndStartServer();