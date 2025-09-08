class ApiError extends Error{
    constructor(statuscode,message){
        super(message);
        this.status= statuscode;
        Error.captureStackTrace(this,this.constructor)
    }
};
export default ApiError;