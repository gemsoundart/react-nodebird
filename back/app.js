const express=require('express');
const cors = require('cors');
const dotenv=require('dotenv');
const session=require('express-session');
const passport=require('passport');
const cookieParser=require('cookie-parser');
const postRouter=require('./routes/post');
const postsRouter=require('./routes/posts');
const userRouter=require('./routes/user');
const hashtagRouter=require('./routes/hashtag');
const db=require('./models');
const passportConfig=require('./passport');
const morgan=require('morgan');
const path = require('path');
const hpp = require('hpp');
const helmet = require('helmet');

dotenv.config();

const app=express();
db.sequelize.sync()
  .then(()=>{
    console.log("db 연결 성공!!!");
  }).catch(console.error);

passportConfig();

if(process.env.NODE_ENV === 'production'){
  app.set('trust proxy',1);
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet());
}else{
  app.use(morgan('dev'));
}
app.use(cors({
  origin: ['http://localhost:3060', 'https://licecream.com'],
  credentials: true,
}));
app.use('/',express.static(path.join(__dirname,'uploads')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized:false,
  resave:false,
  secret:process.env.COOKIE_SECRET,
  proxy:true,
  cookie: {
    httpOnly: true,
    secure: true,
    domain: process.env.NODE_ENV === 'production' && '.licecream.com',
  }
}));
app.use(passport.initialize());
app.use(passport.session());



app.get('/',(req,res)=>{
  res.send('hello express');
});
app.get('/api',(req,res)=>{
  res.send('hello api');
});



app.use('/post',postRouter);
app.use('/user',userRouter);
app.use('/posts',postsRouter);
app.use('/hashtag',hashtagRouter);

app.listen('3065',()=>{
  console.log('Server under going');
});

