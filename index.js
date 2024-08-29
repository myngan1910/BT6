const express = require('express')
const path = require('path')
const app = express()
const multer = require('multer')
var bodyParser = require('body-parser')
const { userInfo } = require('os')
const { name } = require('ejs')
const {PrismaClient} = require('@prisma/client')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const viewRouter = require('./router/viewRouter.js')
const userRouter = require('./router/userRouter.js')
const requireLogin = require('./middleware/checkout.js')
const client = new PrismaClient();


const port = 3000

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './profile/assets/uploads')
  },
  filename: function (req, file, cb) {
    const suffix = file.mimetype.split('/');
    cb(null, `${file.fieldname}-${Date.now()}.${suffix[1]}`);
  }
})

const upload = multer({ storage: storage })
app.use('/', express.static(path.join(__dirname, 'profile')))
app.set('view engine', 'ejs')
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({    
  extended: true
})); 
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.use('/admin',requireLogin.requireLogin,requireLogin.Login,viewRouter);
app.use('/', userRouter);



   


  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  // POST
//   app.get('/admin/post', async(req, res) => {
//     const post = await client.$queryRaw`SELECT * FROM posts`  
//     res.render('./post/post',{data:post} )
//   })
//   app.get('/admin/create-post', async(req, res) => {
      
//       const da = await client.$queryRaw`select * from users`

//   res.render('./post/postcre',{datauserr:da});
//   })
//   app.post('/admin/createpost',upload.single('image'), async(req,res) =>{
//     const title = req.body.title;
//     const image = "assets/uploads/" + req.file.filename ;
//     const des = req.body.description;
//     const time = req.body.time;
//     const userrid = parseInt(req.body.userrid);
//   const update = await client.$queryRaw`INSERT INTO posts (title,image,description,time,userrid) VALUES ( ${title},${image},${des},${time},${userrid})`
//   const updatebookauthor = await client.$queryRaw`INSERT INTO post_categories (postid, categorieid) VALUES (5,5),(6,6)`
  
//   return res.redirect(`/admin/post`)
// })

// app.get('/admin/postblog/:ID', async (req,res) =>{
//   const genId = parseInt(req.params.ID);
//   const data = await client.$queryRaw`SELECT * FROM "posts" WHERE id=${genId}`
//   return res.render("./post/postDetail", {postDetail: data[0]})
//   })
  

  // CATEGORIES
//   app.get('/admin/categories', async(req, res) => {
//     const cate = await client.$queryRaw`SELECT * FROM categories`  
//     res.render('./categories/categories',{data:cate} )
//   })
//   app.get('/create-cate', (req, res) => {
   
//     res.render('./categories/catecre' )
//   })
//   app.post('/admin/createcate', async(req,res) =>{
//   const name = req.body.name;
//   const update = await client.$queryRaw`INSERT INTO categories (name) VALUES ( ${name})`;
  
//   return res.redirect(`/admin/categories`)
// })
//  app.get('/admin/cate/:ID', async (req,res) =>{
//       const genId = parseInt(req.params.ID);
//       const data = await client.$queryRaw`SELECT * FROM "categories" WHERE id=${genId}`
//       return res.render("./categories/cateDetail", {cateDetail: data[0]})
//       })
//   app.get('/admin/catedele/:ID', async (req,res) =>{
//           const genId = parseInt(req.params.ID);
//           const data = await client.$queryRaw`DELETE FROM  post_categories   WHERE post_categories.postid IN (
//             SELECT posts.id FROM posts
//             JOIN post_categories ON posts.id = post_categories.postid
//             JOIN categories ON post_categories.categorieid = categories.id
//             WHERE categories.id = ${genId}
//             )`
//           const data1 = await client.$queryRaw`DELETE FROM categories WHERE id=${genId}`
//           res.redirect(`/admin/categories`)
//     })
//   app.post('/admin/ca/:ID', async (req, res) => {
//       const genId = parseInt(req.params.ID);
//       const name = req.body.name;
     
//       const updateedu = await client.$queryRaw`UPDATE "categories" SET name=${name} WHERE id = ${genId} `
//       return res.redirect(`/admin/categories`)
//     })  
    

  // COMMENTS
//   app.get('/admin/comment', async(req, res) => {
//     const comment = await client.$queryRaw`SELECT * FROM comments`  
//     res.render('./comments/comment',{data:comment} )
//   })
//   app.get('/admin/create-com', async(req, res) => {
//     const data= await client.$queryRaw`select * from posts`
//     const da = await client.$queryRaw`select * from users`
   
//     res.render('./comments/commentcre',{datauser:da,datapost:data}  )
//   })
//   app.post('/admin/createcom', async(req,res) =>{
//     const year = req.body.year;
//   const info = req.body.information;
//   const user = parseInt(req.body.userid);
//   const post = parseInt(req.body.postid);
//   const update = await client.$queryRaw`INSERT INTO comments (year,information, userid, postid) VALUES ( ${year},${info},${user},${post})`;
  
//   return res.redirect(`/admin/comment`)
// })
//  app.get('/admin/comm/:ID', async (req,res) =>{
//       const genId = parseInt(req.params.ID);
//       const data = await client.$queryRaw`SELECT * FROM "comments" WHERE id=${genId}`
//       return res.render("./comments/comeDetail", {comeDetail: data[0]})
//       })
//   app.get('/admin/comdele/:ID', async (req,res) =>{
//           const genId = parseInt(req.params.ID);
//           //  const dele = await client.$queryRaw`DELETE FROM posts
//           //  WHERE id IN (SELECT posts.id FROM posts
//           // JOIN comments ON comments.id = posts.comment
//           // WHERE comments.id = ${genId});`

//          const dele1 = await client.$queryRaw`DELETE FROM comments WHERE id=${genId}`
//           res.redirect(`/admin/comment`)
//     })
//   app.post('/admin/com/:ID', async (req, res) => {
//       const genId = parseInt(req.params.ID);
//       const year = req.body.year;
//       const info = req.body.information;
//       const user = parseInt(req.body.userid);
//       const post = parseInt(req.body.postid);
//       const updateedu = await client.$queryRaw`UPDATE "comments" SET year=${year}, information=${info},userid=${user} ,postid=${post}  WHERE id = ${genId} `
//       return res.redirect(`/admin/comment`)
//     })  
    

  // USER
//   app.get('/admin/user', async(req, res) => {
//     const cate = await client.$queryRaw`SELECT * FROM users`  
//     res.render('./user/user',{data:cate} )
//   })
//   app.get('/create-user', (req, res) => {
   
//     res.render('./user/usercre' )
//   })
//   app.post('/admin/createuser',upload.single('avata'), async(req,res) =>{
//   const name = req.body.name;
//   const avata =  "assets/uploads/" + req.file.filename ;
//   const mail = req.body.mail;
//   const job = req.body.job;
//   const update = await client.$queryRaw`INSERT INTO users (name,avata,mail,job) VALUES ( ${name},${avata},${mail},${job})`;
  
//   return res.redirect(`/admin/user`)
// })
//  app.get('/admin/userr/:ID', async (req,res) =>{
//       const genId = parseInt(req.params.ID);
//       const data = await client.$queryRaw`SELECT * FROM "users" WHERE id=${genId}`
//       return res.render("./user/userDetail", {userDetail: data[0]})
//       })
//   app.get('/admin/userdele/:ID', async (req,res) =>{
//           const genId = parseInt(req.params.ID);
//            const dele = await client.$queryRaw`DELETE FROM posts
//            WHERE id IN (SELECT posts.id FROM posts
//           JOIN users ON users.id = posts.userrid
//           WHERE users.id = ${genId});`
//           const dele1 = await client.$queryRaw`DELETE FROM comments
//           WHERE id IN (SELECT comments.id FROM comments
//          JOIN users ON users.id = comments.userid
//          WHERE users.id = ${genId});`


//          const dele2 = await client.$queryRaw`DELETE FROM users WHERE id=${genId}`
//           res.redirect(`/admin/user`)
//     })
//   app.post('/admin/userr/:ID',upload.single('avata'), async (req, res) => {
//       const genId = parseInt(req.params.ID);
//       const name = req.body.name;
//       const avata =  "assets/uploads/" + req.file.filename ;
//       const mail = req.body.mail;
//       const job = req.body.job;
//       const updateedu = await client.$queryRaw`UPDATE "users" SET name=${name}, avata=${avata},mail=${mail},job=${job} WHERE id = ${genId} `
//       return res.redirect(`/admin/user`)
//     })  
    

  // Profile
//   app.get('/admin/profile', async(req, res) => {
//     const cate = await client.$queryRaw`SELECT * FROM profile`  
//     res.render('./profile/pro',{data:cate} )
//   })
//   app.get('/admin/create-pro', (req, res) => {
   
//     res.render('./profile/procre' )
//   })
//   app.post('/admin/createpro',upload.single('image'), async(req,res) =>{
//   const title = req.body.title;
//   const image =  "assets/uploads/" + req.file.filename ;
//   const des = req.body.description;
//   const cont = req.body.content;
//   const mail = req.body.mail;
//   const phone = parseInt(req.body.phone);
//   const add = req.body.address;
//   const update = await client.$queryRaw`INSERT INTO profile (title,image,description,content,mail,phone,address) VALUES ( ${title},${image},${des},${cont},${mail},${phone},${add})`;
  
//   return res.redirect(`/admin/profile`)
// })
//  app.get('/admin/pro/:ID', async (req,res) =>{
//       const genId = parseInt(req.params.ID);
//       const data = await client.$queryRaw`SELECT * FROM "profile" WHERE id=${genId}`
//       return res.render("./profile/proDetail", {proDetail: data[0]})
//       })
//   app.get('/admin/prodele/:ID', async (req,res) =>{
//           const genId = parseInt(req.params.ID);
        

//           const dele = await client.$queryRaw`DELETE FROM profile WHERE id=${genId}`
//           res.redirect(`/admin/profile`)
//     })
//   app.post('/admin/prof/:ID',upload.single('image'), async (req, res) => {
//     const genId = parseInt(req.params.ID);
//       const title = req.body.title;
//       const image =  "assets/uploads/" + req.file.filename ;
//       const des = req.body.description;
//       const cont = req.body.content;
//       const mail = req.body.mail;
//       const phone = parseInt(req.body.phone);
//       const add = req.body.address;
//       const updateedu = await client.$queryRaw`UPDATE "profile" SET title=${title}, image=${image},description=${des},content=${cont},mail=${mail},phone=${phone}, address=${add} WHERE id = ${genId} `
//       return res.redirect(`/admin/profile`)
//     })  
    
 
  // VISION
//   app.get('/admin/vision', async(req, res) => {
//     const cate = await client.$queryRaw`SELECT * FROM vision`  
//     res.render('./vision/vision',{data:cate} )
//   })
//   app.get('/admin/create-vi', (req, res) => {
   
//     res.render('./vision/visioncre' )
//   })
//   app.post('/admin/createvi',upload.single('icon'), async(req,res) =>{
  
//   const image =  "assets/uploads/" + req.file.filename ;
//   const title = req.body.title;
//   const des = req.body.description;
 
//   const update = await client.$queryRaw`INSERT INTO vision (icon,title,description) VALUES ( ${image},${title},${des})`;
  
//   return res.redirect(`/admin/vision`)
// })
//  app.get('/admin/vi/:ID', async (req,res) =>{
//       const genId = parseInt(req.params.ID);
//       const data = await client.$queryRaw`SELECT * FROM "vision" WHERE id=${genId}`
//       return res.render("./vision/visionDetail", {visionDetail: data[0]})
//       })
//   app.get('/admin/videle/:ID', async (req,res) =>{
//           const genId = parseInt(req.params.ID);
//           const dele = await client.$queryRaw`DELETE FROM vision WHERE id=${genId}`
//           res.redirect(`/admin/vision`)
//     })
//   app.post('/admin/vis/:ID',upload.single('icon'), async (req, res) => {
//     const genId = parseInt(req.params.ID);
//       const image =  "assets/uploads/" + req.file.filename ;
//       const title = req.body.title;
//       const des = req.body.description;
//       const updateedu = await client.$queryRaw`UPDATE "vision" SET  icon=${image},title=${title},description=${des} WHERE id = ${genId} `
//       return res.redirect(`/admin/vision`)
//     })  

  // ROLE
//   app.get('/admin/role', async(req, res) => {
//     const cate = await client.$queryRaw`SELECT * FROM role`  
//     res.render('./role/role',{data:cate} )
//   })
//   app.get('/admin/create-role', (req, res) => {
   
//     res.render('./role/rolecre' )
//   })
//   app.post('/admin/createrole', async(req,res) =>{
//   const name = req.body.name;
//   const mail = req.body.mail;
 
//   const update = await client.$queryRaw`INSERT INTO role (name,mail) VALUES ( ${name},${mail})`;
  
//   return res.redirect(`/admin/role`)
// })
//  app.get('/admin/ro/:ID', async (req,res) =>{
//       const genId = parseInt(req.params.ID);
//       const data = await client.$queryRaw`SELECT * FROM "role" WHERE id=${genId}`
//       return res.render("./role/roleDetail", {roleDetail: data[0]})
//       })
//   app.get('/admin/rodele/:ID', async (req,res) =>{
//           const genId = parseInt(req.params.ID);
//          const dele1 = await client.$queryRaw`DELETE FROM role WHERE id=${genId}`
//           res.redirect(`/admin/role`)
//     })
//   app.post('/admin/com/:ID', async (req, res) => {
//       const genId = parseInt(req.params.ID);
//       const name = req.body.name;
//       const mail = req.body.mail;
//       const updateedu = await client.$queryRaw`UPDATE "role" SET name=${name}, mail=${mail} WHERE id = ${genId} `
//       return res.redirect(`/admin/role`)
//     })  

  // SOCIAL
//   app.get('/admin/social', async(req, res) => {
//     const cate = await client.$queryRaw`SELECT * FROM social`  
//     res.render('./social/social',{data:cate} )
//   })
//   app.get('/admin/create-so', (req, res) => {
   
//     res.render('./social/socialcre' )
//   })
//   app.post('/admin/createsocial',upload.single('image'), async(req,res) =>{
//   const name = req.body.name;
//   const image =  "assets/uploads/" + req.file.filename ;
//   const link = req.body.link;
//   const update = await client.$queryRaw`INSERT INTO social (name,image,link) VALUES ( ${name},${image},${link})`;
  
//   return res.redirect(`/admin/social`)
// })
//  app.get('/admin/so/:ID', async (req,res) =>{
//       const genId = parseInt(req.params.ID);
//       const data = await client.$queryRaw`SELECT * FROM "social" WHERE id=${genId}`
//       return res.render("./social/socialDetail", {socialDetail: data[0]})
//       })
//   app.get('/admin/sodele/:ID', async (req,res) =>{
//           const genId = parseInt(req.params.ID);
//           const dele = await client.$queryRaw`DELETE FROM social WHERE id=${genId}`
//           res.redirect(`/admin/social`)
//     })
//   app.post('/admin/ss/:ID',upload.single('image'), async (req, res) => {
//       const genId = parseInt(req.params.ID);
//       const name = req.body.name;
//       const image =  "assets/uploads/" + req.file.filename ;
//       const link = req.body.link;
//       const updateedu = await client.$queryRaw`UPDATE "social" SET name=${name}, image=${image},link=${link} WHERE id = ${genId} `
//       return res.redirect(`/admin/social`)
//     })  

//     //CONTACT
//     app.get('/admin/contact', async(req, res) => {
//       const cate = await client.$queryRaw`SELECT * FROM contact`  
//       res.render('./contact/ctc',{data:cate} )
//     })
//     app.post('/createsocial', async(req,res) =>{
//     const name = req.body.name;
//     const mail = req.body.mail;
//     const subject = req.body.subject;
//     const mess = req.body.message;
//     const update = await client.$queryRaw`INSERT INTO contact (name,mail,subject,message) VALUES ( ${name},${mail},${subject},${mess})`;
    
//     return res.redirect(`/contact`)
//   })
//    app.get('/admin/ctc/:ID', async (req,res) =>{
//         const genId = parseInt(req.params.ID);
//         const data = await client.$queryRaw`SELECT * FROM "contact" WHERE id=${genId}`
//         return res.render("./contact/ctcDetail", {ctcDetail: data[0]})
//         })
//     app.get('/admin/ctcdele/:ID', async (req,res) =>{
//             const genId = parseInt(req.params.ID);
//             const dele = await client.$queryRaw`DELETE FROM contact WHERE id=${genId}`
//             res.redirect(`/admin/contact`)
//       })
//     app.post('/admin/cont/:ID', async (req, res) => {
//         const genId = parseInt(req.params.ID);
//         const name = req.body.name;
//         const mail = req.body.mail;
//         const subject = req.body.subject;
//         const mess = req.body.message;
//         const updateedu = await client.$queryRaw`UPDATE "contact" SET name=${name}, mail=${mail},subject=${subject},message=${mess} WHERE id = ${genId} `
//         return res.redirect(`/admin/contact`)
//       })  
  

 