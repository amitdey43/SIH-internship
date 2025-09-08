

const sendToken= (user,status,res)=>{
    let token = user.getJWTToken();

    res.status(status).cookie("token",token,{
        expires:new Date(Date.now()+ process.env.COOKIE_EXPIRE*24*60*60*1000),
        httpOnly: true
    }).json({
        success:true,
        user,
        token,
        
    })
}
export default sendToken;