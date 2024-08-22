const express = require('express')
const app = express()
const ViewModel = require('../model/viewModel.js')
const bcrypt = require('bcrypt')
const viewModel = require('../model/viewModel.js')
module.exports = {
    adminPort: async(req,res) =>{
        
        res.render('index1')
    },


    getPort: async(req,res) =>{
       
        const dtPro = await ViewModel.getPort();
        res.render('./post/post',{data:dtPro} )
    },
    createPort: async(req,res) => {
        const data = await ViewModel.getUser();
        res.render('./post/postcre',{datauserr:data});
    },
    postPort:  async(req,res) => {
        const title = req.body.title;
        const image = req.file ;
        const data = [];
        console.log(data.length)
        const img = await viewModel.checkimg(image,data)
        const des = req.body.description;
        const time = req.body.time;
        const userrid = parseInt(req.body.userrid);
        
        const createPro =  await ViewModel.postPort(title,img,des,time,userrid);
        return res.redirect(`/admin/post`)
      
    
    },
    detailPort: async(req,res) => {
       
        const genId = parseInt(req.params.ID);
        const data = await ViewModel.getUser();
        const detailPro=  await ViewModel.detailPort(genId)
        return res.render("./post/postDetail", {postDetail: detailPro[0],datauserr:data})
    },
    delePort: async(req,res) => {
        const genId = parseInt(req.params.ID);
     
        const delePro =  await ViewModel.delePort(genId)
        res.redirect(`/admin/post`)
        
    },
    viewPort: async(req,res) => {
        const genId = parseInt(req.params.ID);
        const title = req.body.title;
        const image = "assets/uploads/" + req.file.filename ;
        const des = req.body.description;
        const time = req.body.time;
        const userrid = parseInt(req.body.userrid);
        const viewPro =  await ViewModel.viewPort(genId,title,image,des,time,userrid)
        return res.redirect(`/admin/post`)
    },

    //CATEGORIES
    getCate: async(req,res) =>{
        const dtPro = await ViewModel.getCate();
        res.render('./categories/categories',{data:dtPro} )
    },
    createCate: async(req,res) => {
        res.render('./categories/catecre' )
    },
    postCate:  async(req,res) => {
        const name = req.body.name;
        
        const createPro =  await ViewModel.postCate(name);
        return res.redirect(`/admin/categories`)
      
    
    },
    detailCate: async(req,res) => {
       
        const genId = parseInt(req.params.ID);
        const data=  await ViewModel.detailCate(genId)
        return res.render("./categories/cateDetail", {cateDetail: data[0]})
    },
    deleCate: async(req,res) => {
        const genId = parseInt(req.params.ID);
     
        const delePro =  await ViewModel.deleCate(genId)
        res.redirect(`/admin/categories`)
        
    },
    viewCate: async(req,res) => {
        const genId = parseInt(req.params.ID);
        const name = req.body.name;
        const viewPro =  await ViewModel.viewCate(genId,name)
        return res.redirect(`/admin/categories`)
    },

    //COMMENT
    getCom: async(req,res) =>{
        const comment = await ViewModel.getComment();
        res.render('./comments/comment',{data:comment} )
    },
    createCom: async(req,res) => {
        const da = await ViewModel.getPort();
        const data = await ViewModel.getUser();
        res.render('./comments/commentcre',{datauser:data,datapost:da}  )
    },
    postCom:  async(req,res) => {
        const year = 'today';
        const info = req.body.message;
        const user = parseInt(req.session.userId);
        const post = parseInt(req.params.postid);
        console.log(user)
        const createPro =  await ViewModel.postCom(year,info,user,post);
        return res.redirect(`/admin/comment`)
      
    
    },
    detailCom: async(req,res) => {
       
        const genId = parseInt(req.params.ID);
        const data=  await ViewModel.detailCom(genId)
        return res.render("./comments/comeDetail", {comeDetail: data[0]})
    },
    deleCom: async(req,res) => {
        const genId = parseInt(req.params.ID);
     
        const delePro =  await ViewModel.deleCom(genId)
        res.redirect(`/admin/comment`)
        
    },
    viewCom: async(req,res) => {
        const genId = parseInt(req.params.ID);
        const year = req.body.year;
        const info = req.body.information;
        const user = parseInt(req.body.userid);
        const post = parseInt(req.body.postid);
        const viewPro =  await ViewModel.viewCom(genId,year,info,user,post)
        return res.redirect(`/admin/comment`)
    },
    
    //USER
    getUser: async(req,res) =>{
        const cate = await ViewModel.getUser();
        res.render('./user/user',{data:cate} )
    },
    createUser: async(req,res) => {
        const data = await ViewModel.getRole();
        res.render('./user/usercre' ,{datarole:data})
    },
    postUser:  async(req,res) => {
        const name = req.body.name;
        const image = req.file ;
        const data = [];
        const avata =  await viewModel.checkimg(image,data)
        const mail = req.body.mail;
        const job = req.body.job;
        const pass1 = req.body.pass;
        const pass =  bcrypt.hashSync(pass1,5)
        const rolee = parseInt(req.body.roleid);
        const des = req.body.description;

        
        const createPro =  await ViewModel.postUser(name,avata,mail,job,pass,des,rolee);
        console.log(rolee)
        return res.redirect(`/admin/user`)
    
    },
    detailUser: async(req,res) => {
       
        const genId = parseInt(req.params.ID);
        const data=  await ViewModel.detailUser(genId)
        const dt= await ViewModel.getRole();
        return res.render("./user/userDetail", {userDetail: data[0],datauserr:dt})
    },
    deleUser: async(req,res) => {
        const genId = parseInt(req.params.ID);
     
        const delePro =  await ViewModel.deleUser(genId)
        res.redirect(`/admin/user`)
        
    },
    viewUser: async(req,res) => {
        const genId = parseInt(req.params.ID);
        const name = req.body.name;
        const image = req.file ;
        const data = await viewModel.detailUser(genId);
        console.log(data.length)
        const avata= await viewModel.checkimg(image,data)
        const mail = req.body.mail;
        const job = req.body.job;
        const pass = req.body.pass;
      

        const rolee = parseInt(req.body.roleid);
        const des = req.body.description;

        const viewPro =  await ViewModel.viewUser(genId,name,avata,mail,job,pass,rolee,des)
        return res.redirect(`/admin/user`)
    },

    //PROFILE
    getPro: async(req,res) =>{
        const dtPro = await ViewModel.getPro();
        res.render('./profile/pro',{data:dtPro} )
    },
    createPro: async(req,res) => {
        res.render('./profile/procre' )
    },
    postPro:  async(req,res) => {
        const title = req.body.title;
        const image = req.file ;
        const data = [];
        const img = await viewModel.checkimg(image,data)
        const des = req.body.description;
        const cont = req.body.content;
        const mail = req.body.mail;
        const phone = parseInt(req.body.phone);
        const add = req.body.address;
        
        const createPro =  await ViewModel.postPro(title,img,des,cont,mail,phone,add);
        return res.redirect(`/admin/profile`)
      
    
    },
    detailPro: async(req,res) => {
       
        const genId = parseInt(req.params.ID);
        const detailPro=  await ViewModel.detailPro(genId)
        return res.render("./profile/proDetail", {proDetail: detailPro[0]})
       
    },
    delePro: async(req,res) => {
        const genId = parseInt(req.params.ID);
     
        const delePro =  await ViewModel.delePro(genId)
        res.redirect(`/admin/profile`)
        
    },
    viewPro: async(req,res) => {
        const genId = parseInt(req.params.ID);
        const title = req.body.title;
        const image = req.file;
        const data = await viewModel.detailPro(genId);
        const img = await viewModel.checkimg(image,data)
        const des = req.body.description;
        const cont = req.body.content;
        const mail = req.body.mail;
        const phone = parseInt(req.body.phone);
        const add = req.body.address;
        const viewPro =  await ViewModel.viewPro(genId,title,img,des,cont,mail,phone,add)
        return res.redirect(`/admin/profile`)
    },
    //VISION
    getVi: async(req,res) =>{
        const dtPro = await ViewModel.getVi();
        res.render('./vision/vision',{data:dtPro} )
    },
    createVi: async(req,res) => {
        res.render('./vision/visioncre' )
    },
    postVi:  async(req,res) => {
        const image =   req.file;
        const data = []; 
        const img = await viewModel.checkimg(image,data)
        const title = req.body.title;
        const des = req.body.description;
        
        const createPro =  await ViewModel.postVi(img,title,des);
        return res.redirect(`/admin/vision`)
      
    
    },
    detailVi: async(req,res) => {
       
        const genId = parseInt(req.params.ID);
        const data=  await ViewModel.detailVi(genId)
        return res.render("./vision/visionDetail", {visionDetail: data[0]})
       
    },
    deleVi: async(req,res) => {
        const genId = parseInt(req.params.ID);
     
        const delePro =  await ViewModel.deleVi(genId)
        res.redirect(`/admin/vision`)
        
    },
    viewVi: async(req,res) => {
        const genId = parseInt(req.params.ID);
        const image = req.file ;
        const data = await viewModel.deleVi(genId);
        const img = await viewModel.checkimg(image,data)
        const title = req.body.title;
        const des = req.body.description;
        const viewPro =  await ViewModel.viewVi(genId,img,title,des)
        return res.redirect(`/admin/vision`)
    },

    //ROLE
    getRole: async(req,res) =>{
        const dtPro = await ViewModel.getRole();
        res.render('./role/role',{data:dtPro} )
    },
    createRole: async(req,res) => {
        res.render('./role/rolecre' )
    },
    postRole:  async(req,res) => {
        const possion = req.body.possion;
       
        
        const createPro =  await ViewModel.postRole(possion);
        return res.redirect(`/admin/role`)
      
    
    },
    detailRole: async(req,res) => {
       
        const genId = parseInt(req.params.ID);
        const data=  await ViewModel.detailRole(genId)
        return res.render("./role/roleDetail", {roleDetail: data[0]})
       
    },
    deleRole: async(req,res) => {
        const genId = parseInt(req.params.ID);
     
        const delePro =  await ViewModel.deleRole(genId)
        res.redirect(`/admin/role`)
        
    },
    viewRole: async(req,res) => {
        const genId = parseInt(req.params.ID);
        const possion = req.body.possion;
        const viewPro =  await ViewModel.viewRole(genId,possion)
        return res.redirect(`/admin/role`)
    },

    //CONTACT
getCtc: async(req,res) =>{
    const data = await ViewModel.getCtc();
    res.render('./contact/ctc',{data:data} )
},

postCtc:  async(req,res) => {
    const name = req.body.name;
    const mail = req.body.mail;
    const subject = req.body.subject;
    const mess = req.body.message;
    const createCtc =  await ViewModel.postCtc(name,mail,subject,mess);
      
    return res.redirect(`/contact`)
    
   
   
  

},
detailCtc: async(req,res) => {
    const genId = parseInt(req.params.ID);
    const detailCtc =  await ViewModel.detailCtc(genId)
    return res.render("./contact/ctcDetail", {ctcDetail: detailCtc[0]})
},
deleCtc: async(req,res) => {
    const genId = parseInt(req.params.ID);
    const deleCtc =  await ViewModel.deleCtc(genId)
    res.redirect(`/admin/contact`)
    
},
viewCtc: async(req,res) => {
    const genId = parseInt(req.params.ID);
    const name = req.body.name;
    const mail = req.body.mail;
    const subject = req.body.subject;
    const mess = req.body.message;
   
    const viewCt =  await ViewModel.viewCtc(genId,name,mail,subject,mess)
    return res.redirect(`/admin/contact`)
},
// SOCIAL
getSocial: async(req,res) =>{
    const data = await ViewModel.getSocial();
    res.render('./social/social',{data:data} )
},
createSocial: async(req,res) => {
    res.render('./social/socialcre' )
},
postSocial:  async(req,res) => {
    const name = req.body.name;
    const image =  "assets/uploads/" + req.file.filename ;
    const link = req.body.link;
    
    const createCtc =  await ViewModel.postSocial(name,image,link);
      
    return res.redirect(`/admin/social`)
},
detailSocial: async(req,res) => {
    const genId = parseInt(req.params.ID);
    const data =  await ViewModel.detailSocial(genId)
    return res.render("./social/socialDetail", {socialDetail: data[0]})
},
deleSocial: async(req,res) => {
    const genId = parseInt(req.params.ID);
    const deleCtc =  await ViewModel.deleSocial(genId)
    res.redirect(`/admin/social`)
    
},
viewSocial: async(req,res) => {
    const genId = parseInt(req.params.ID);
    const name = req.body.name;
    const image =   req.file ;
    const data = await viewModel.detailSocial(genId)
    const img = await viewModel.checkimg(image,data)
    const link = req.body.link;
    const viewCt =  await ViewModel.viewSocial(genId,name,img,link)
    return res.redirect(`/admin/social`)
},
}