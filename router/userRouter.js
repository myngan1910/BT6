const express = require('express')
const router = express.Router();
const userController = require('../controller/userController.js')
const loginRouter = require('../controller/loginController.js')
const requireLogin = require('../middleware/checkout.js')
const requireComment = require('../middleware/comment.js')
const requireContact = require('../middleware/contact.js')
const checkin = require('../middleware/checkRegister.js')
const multer = require('multer')
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

  

  router.get('/', userController.getUserr);
  router.get('/post/:ID', userController.getPostt);
  router.post('/comment/:ID',requireLogin.requireLogin, requireComment.requireComment, userController.postCom)
  
  router.get('/about', userController.getAbout);
  router.get('/contact', userController.getContact);
  router.post('/createcontact',requireContact.requireContact, userController.postCtc);


  router.get('/login', loginRouter.login);
  router.post('/login', loginRouter.postLogin);
  router.get('/register', loginRouter.getRegister);
  router.post('/Register',upload.single('avata'), checkin.requireRegister,loginRouter.postRegister);

  module.exports = router;