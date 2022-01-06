const express=require('express');
const { Op } = require('sequelize');
const { Post, Comment, User, Image, Hashtag } = require('../models');
const router=express.Router();


router.get('/:hashtag', async (req, res, next) => {
  try {
    console.log(decodeURIComponent(req.params.hashtag));
    const where={};
    if(parseInt(req.query.lastId,10)){
      where.id={[Op.lt]: parseInt(req.query.lastId,10)}
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment,'createdAt', 'DESC']
      ],
      include: [{
        model: Hashtag,
        where: { name: decodeURIComponent(req.params.hashtag) }
      },{
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        },]
      },{
        model: User, //좋아요 누른 사람
        as: 'Likers',
        attributes: ['id'],
      },{
        model: Post,
        as: 'Retweet',
        include: [{
          model: User,
          attributes: ['id','nickname'],
        },{
          model: Image,
        }]
      },],
    });
    res.status(200).json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
