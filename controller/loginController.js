const express = require('express')
const app = express()
const login = require('../model/loginModel.js')
const userModel = require('../model/viewModel.js')
const  bcrypt = require('bcrypt')

module.exports = {
    login: async(req,res) =>{
        res.render('login');
    },
    postLogin: async(req,res) =>{
        
        const name = req.body.username;
        const passs = req.body.password;
        const user = await login.postLogin(name);

        const checkpass = await bcrypt.compare(passs,user[0].pass)
        console.log(user)
        console.log(checkpass)
      if(user.length != 0  && checkpass){
        req.session.userId = user[0].id;
        
        res.redirect('/');
      } else{
        res.redirect('/login')
      }
      
      
    },
    

    getRegister: async(req,res) =>{
      res.render("register");
  },
  postRegister: async(req,res) => {
      const name = req.body.name;
        const avata =  "assets/uploads/" + req.file.filename ;
        const mail = req.body.mail;
        const job = req.body.job;
        const pass1 = req.body.pass;
        const pass = bcrypt.hashSync(pass1,5)
        const rolee = 1;
        const des = req.body.description;
        const createPro =  await userModel.createUser(name,avata,mail,job,pass,des,rolee);
        return res.redirect(`/login`)
  },
    logout: async(req,res) =>{
        req.session.destroy(err => {
            if (err) {
              console.error('Error destroying session:', err);
            }
            res.clearCookie('connect.sid');
            res.redirect('/admin/userInfo');
          });

    }

}