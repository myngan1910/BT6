const {PrismaClient} = require('@prisma/client')
const client = new PrismaClient();
const login = require('../model/viewModel')
module.exports = {
    requireLogin: (req, res, next) =>{
     
        if (!req.session.userId) {
        
          res.redirect('/login');
        } else {
          next();
        }

      },
     Login: async(req,res, next ) => {
       const id = req.session.userId;
       const data = await login.postLogin(id);
       
       if(data[0].possion !=  "Admin" ) {
          res.redirect('/')
       } else {
        next()
       }
     }
      

}