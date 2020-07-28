const { Router } = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const Post = require('../models/Post.model');
const mongoose = require('mongoose');

const routeGuard = require('../configs/route-guard.config');

const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary.v2
});
const upload = multer({ storage });

router.get('/create', routeGuard, (req, res) => {
  res.render('post/create');
});

router.post('/create', upload.single('attachment'), routeGuard, (req, res, next) => {
  const { content, creatorId, picName } = req.body;
  const url = req.file.path;
  console.log(content, url);
  Post.create({
    content,
    creatorId: req.session.currentUser._id,
    picPath: url,
    picName
  })
    .then(post => {
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

router.get('/', routeGuard, (request, response, next) => {
  Post.find()
    .populate('creatorId')
    .then(posts => {
      console.log(posts);
      response.render('index', { posts });
    })
    .catch(error => {
      next(error);
    });
});

router.get('post/single/:id', (req, res, next) => {
  const id = req.params.id;

  Post.findById(id)
    .populate('creatorId')
    .then(post => {
      if (post) {
        res.render('post/single', { post: post });
      } else {
        next();
      }
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
