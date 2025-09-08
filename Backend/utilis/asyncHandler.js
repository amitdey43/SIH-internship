let asyncHandler = (asyncfun)=> (req,res,next)=>{
    Promise.resolve(asyncfun(req,res,next)).catch(next);
}
export default asyncHandler;