const {Router} = require('express');
const router = Router();
const multer = require('multer')

const isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    } else {
        res.status(401).json({
            error: {message: "Not Authorized"}
        })
    }
}

const upload = multer({
    fileFilter(req, file, cb) {
        if (!file.mimetype.match(/\/(png|jpg|jpeg)$/)){
            cb (new Error('Please upload an image.'))
        }
        cb(undefined, true)
    }
})

const { signup, signin, authenticate, getUser, uploadImage, getUserImage, getActivity} = require('../controllers/users.controllers');

router.post('/api/signup', signup)

router.post('/api/signin', signin)

router.get('/api/authenticate', isAuthenticated , authenticate)

router.get("/api/user/:id", getUser)

router.put('/api/upload-user-image/:id', upload.single('user-img'), uploadImage)

router.get('/api/user-image/:id', getUserImage)

router.get("/api/user-activity/:id", getActivity)

module.exports = router;