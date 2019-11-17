const express = require('express');
const router = express.Router();

const articleRouter = require('./resources/article');
const categoryRouter = require('./resources/category');
const sectionRouter = require('./resources/section');
const imageRouter = require('./resources/image');
const sessionRouter = require('./resources/session');
const userRouter = require('./resources/user');

router.use('/articles', articleRouter);
router.use('/categories', categoryRouter);
router.use('/sections', sectionRouter);
router.use('/images', imageRouter);
router.use('/sessions', sessionRouter);
router.use('/user', userRouter);

module.exports = router;