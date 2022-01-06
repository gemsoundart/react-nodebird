const passport=require('passport');
const local=require('./local');
const { User }=require('../models');
module.exports=()=>{
  //기본적으로 가지고 있는 쿠키 id
  passport.serializeUser((user,done)=>{
    done(null,user.id);
  });

  //아무 라우터에 접근 때 쿠키 id를 참조하여 유저 전체 정보를 가저 옴
  //따라서 라우터 내에서는 로그인 상태일 경우 req.user를 사용할 수 있음
  passport.deserializeUser(async (id,done)=>{
    try{
      const user=await User.findOne({ where: { id } });
      done(null,user);
    }catch (e) {
      console.error(e);
      done(e);
    }
  });
  local();
}
