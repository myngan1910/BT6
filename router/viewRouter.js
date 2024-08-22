const express = require('express')
const router = express.Router();
const viewController = require('../controller/viewController.js')
const login = require('../middleware/checkout.js')
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





  router.get('/', viewController.adminPort);
  // POST
router.get('/post',login.Login,viewController.getPort);

router.get('/create-post',viewController.createPort);
router.post('/createpost',upload.single('image'), viewController.postPort);
router.get('/postblog/:ID',viewController.detailPort);
router.get('/postdele/:ID',viewController.delePort);
router.post('/pos/:ID',upload.single('image'),viewController.viewPort);

//categories

router.get('/categories',viewController.getCate);
router.get('/create-cate',viewController.createCate);
router.post('/createcate', viewController.postCate);
router.get('/cate/:ID',viewController.detailCate);
router.get('/catedele/:ID',viewController.deleCate);
router.post('/ca/:ID',viewController.viewCate);


//COMMENT
router.get('/comment',viewController.getCom);
router.get('/comm/:ID',viewController.detailCom);
router.get('/comdele/:ID',viewController.deleCom);
router.post('/com/:ID',viewController.viewCom);


//USER
router.get('/user',viewController.getUser);
router.get('/userr/:ID',viewController.detailUser);
router.get('/userdele/:ID',viewController.deleUser);
router.post('/userr/:ID',upload.single('avata'),viewController.viewUser);

//PROFILE
router.get('/profile',viewController.getPro);
router.get('/create-pro',viewController.createPro);
router.post('/createpro',upload.single('image'), viewController.postPro);
router.get('/pro/:ID',viewController.detailPro);
router.get('/prodele/:ID',viewController.delePro);
router.post('/prof/:ID',upload.single('image'),viewController.viewPro);

//VISION
router.get('/vision',viewController.getVi);
router.get('/create-vi',viewController.createVi);
router.post('/createvi',upload.single('icon'), viewController.postVi);
router.get('/vi/:ID',viewController.detailVi);
router.get('/videle/:ID',viewController.deleVi);
router.post('/vis/:ID',upload.single('icon'),viewController.viewVi);

//ROLE
router.get('/role',viewController.getRole);
router.get('/create-role',viewController.createRole);
router.post('/createrole', viewController.postRole);
router.get('/ro/:ID',viewController.detailRole);
router.get('/rodele/:ID',viewController.deleRole);
router.post('/rol/:ID',viewController.viewRole);


//CONTACT
router.get('/contact',viewController.getCtc);
router.get('/ctc/:ID',viewController.detailCtc);
router.get('/ctcdele/:ID',viewController.deleCtc);
router.post('/cont/:ID', viewController.viewCtc);


//SOCIAL
router.get('/social', viewController.getSocial)
router.get('/create-so',  viewController.createSocial)
router.post('/createsocial',upload.single('image'), viewController.postSocial);
router.get('/so/:ID',viewController.detailSocial);
router.get('/socialdele/:ID',viewController.deleSocial);
router.post('/ss/:ID',upload.single('image'), viewController.viewSocial);
  module.exports = router; 