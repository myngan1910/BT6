const express = require('express')
const app = express()
const userModel = require('../model/viewModel.js')


module.exports = {
    getPage: async(req,res) => {
        const id = parseInt(req.params.ID)||1;
        const role = await userModel.getRole();
        const social = await userModel.getSocial();
        const page = await userModel.getPage((id-1)*4);
        res.render('index',{k1:'active', k2:'', k3:'', k4:'',port:page, role:role,social:social})

    },
    getPostt: async(req,res) => {
        const genId = parseInt(req.params.ID);
        const ca = await userModel.getCate();
        const port = await userModel.singlePort(genId);
        const port1= await userModel.getPort();
        const comment = await userModel.getCom(genId);
        const social = await userModel.getSocial();
      

        res.render('post',{k1:'', k2:'active', k3:'', k4:'', ca:ca,data:port, dt:port1,comment:comment,social:social})

    },
   

    postCom: async(req,res) => {
        const year = 'today';
        const info = req.body.message;
        const user = parseInt(req.session.userId);
        const post = parseInt(req.params.ID);
        console.log(post)
        const port = await userModel.postCom(year,info,user,post);

       return res.redirect(`/`)
    },
    getAbout: async(req,res) => {
        const profile = await userModel.getPro();
        const vision = await userModel.getVi();
        const user = await userModel.getUserrole();
        const social = await userModel.getSocial();

        res.render('about',{k1:'', k2:'', k3:'active', k4:'',pro:profile,vi:vision, user:user,social:social })

    },
    getContact: async(req,res) => {
        const profile = await userModel.getPro();
        const social = await userModel.getSocial();
        
      
        res.render('contact',{k1:'', k2:'', k3:'', k4:'active',pro:profile, social:social} )

    },
    postCtc:  async(req,res) => {
        const name = req.body.name;
        const mail = req.body.mail;
        const subject = req.body.subject;
        const mess = req.body.message;
        const createCtc =  await userModel.postCtc(name,mail,subject,mess);
          
        return res.redirect(`/contact`)
        
    
}
}