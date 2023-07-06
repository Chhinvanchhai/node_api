const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const {
    postNewUser,
    putUser,
    findUser,
    // test,
    updateUser,
    deleteUser
} = require('../controller/users')
const {
    post,
    getPost,
    deletePost,
    updatePost,
    addType,
    getType,
    updateType,
    getOneType,
    search
} = require('../controller/post')
const {
    login,
    me,
    users
} = require('../controller/auth')

const {
    products,
    category,
    currencies
} = require('../controller/product')

const { test } = require('../controller/test')
// Form
const { post_form , getForm} = require('../controller/form')

router
    .get('/user',findUser)
    .post('/user',protect,postNewUser);
router.post('/deleteuser',protect,deleteUser);
router.post("/updateuser",updateUser);
router.get('/getusers',users)

router
    .route('/user/:id');
    // .put(putUser)
    // .delete(deleteUser);
router.post('/login',login);
router.post("/post",protect,post);
router.post("/deletpost",protect,deletePost);
router.post('/updatepost',protect,updatePost);
router.post('/addtype',protect, addType);
router.get('/getype', getType);
router.get('/search', search);
router.get("/post",getPost);
router.post("/updatetype", protect,updateType);
router.post("/getonetype",updateType);
router.get("/me",me);
//  Test
router.get('/test', test);
// Form
router.post('/form_setting',post_form);
router.get('/get_form_setting',getForm);

// product 
router.get('/products',products)
router.get('/category',category)
router.get('/currencies',currencies)

module.exports = router;