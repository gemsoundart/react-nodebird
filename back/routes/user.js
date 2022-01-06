const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User, Post, Comment, Image } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Op } = require('sequelize');
const router = express.Router();

router.get('/', async (req, res, next) => {
  console.log(req.headers);
  try {
    if (req.user) {
      const user = await User.findOne({
        where: { id: req.user.id },
        attributes: { exclude: ['password'] },
        include: [{
          model: Post,
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        }]
      });
      res.status(200).json(user);
    } else {
      res.status(200).json(null);
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
})


router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: { exclude: ['password'] },
        include: [{
          model: Post,
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        }]
      })
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});


router.post('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      }
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디 입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send('ok');
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/logout', isLoggedIn, (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: { id: req.user.id },

      });
    res.status(200).json({ nickname: req.body.nickname });
  } catch (e) {
    console.error(e);
    next(e);
  }
})

router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    console.log(userId);
    const user = await User.findOne({
      where: { id: userId },
    })
    if (!user) {
      res.status(403).send('존재하지 않는 유저입니다.');
    }
    await user.addFollowers(req.user.id);
    res.status(200).json({ UserId: userId });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/:userId/unfollow', isLoggedIn, async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    console.log(userId);
    const user = await User.findOne({
      where: { id: userId },
    })
    if (!user) {
      res.status(403).send('존재하지 않는 유저입니다.');
    }
    await user.removeFollowers(req.user.id);
    res.status(200).json({ UserId: userId });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    console.log(userId);
    const user = await User.findOne({
      where: { id: userId },
    })
    if (!user) {
      res.status(403).send('존재하지 않는 유저입니다.');
    }
    await user.removeFollowings(req.user.id);
    res.status(200).json({ UserId: userId });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//로드 팔로워 리스트
router.get('/followers', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    })
    if (!user) {
      res.status(403).send('존재하지 않는 유저입니다.');
    }
    const followers = await user.getFollowers({
      limit: parseInt(req.query.limit,10),
      attributes: ['id', 'nickname'] });
    res.status(200).json( followers );
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//로드 팔로잉 리스트
router.get('/followings', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    })
    if (!user) {
      res.status(403).send('존재하지 않는 유저입니다.');
    }
    const followings = await user.getFollowings({
      limit: parseInt(req.query.limit,10),
      attributes: ['id', 'nickname'] });
    res.status(200).json(followings );
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/:userId/posts', async (req, res, next) => {
  try {
    const where={UserId:req.params.userId};
    if(parseInt(req.query.lastId,10)){
      where.id={[Op.lt]: parseInt(req.query.lastId,10)}
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
      ],
      include: [{
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

router.get('/:userId', async (req, res, next) => { // GET /user/1
  try {
    const fullUserWithoutPassword = await User.findOne({
      where: { id: req.params.userId },
      attributes: {
        exclude: ['password']
      },
      include: [{
        model: Post,
        attributes: ['id'],
      }, {
        model: User,
        as: 'Followings',
        attributes: ['id'],
      }, {
        model: User,
        as: 'Followers',
        attributes: ['id'],
      }]
    })
    if (fullUserWithoutPassword) {
      const data = fullUserWithoutPassword.toJSON();
      data.Posts = data.Posts.length; // 개인정보 침해 예방
      data.Followers = data.Followers.length;
      data.Followings = data.Followings.length;
      res.status(200).json(data);
    } else {
      res.status(404).json('존재하지 않는 사용자입니다.');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});


module.exports = router;
