import { ValidationError } from "class-validator";
import { Response } from "express";
import { isProduction } from "../AppHelper";

export enum HttpSuccessStatus {
    Success = 200,
    Created = 201
}

export enum HttpErrorStatus {
    BadRequest= 400,
    Unauthorized = 401,
    NotFound = 404,
    Forbidden = 403,
    NotAcceptable = 406,
    Conflict = 409,
    RequestOverSize = 413,
    InternalServerError = 500,
}

interface IGoodResData {
    status: true,
    statusCode: HttpSuccessStatus,
    message: string,
    resData?: any,   
}

interface IBadResData {
    status: false,
    statusCode: HttpErrorStatus,
    message: string | ValidationError[] | Error,
    error: string,
    resData?: any
}


const SuccessConfig:{[key:string]:IGoodResData} = {
    [HttpSuccessStatus.Success]: {
        status: true,
        statusCode: 200,
        message: "Success"
    },
    [HttpSuccessStatus.Created]: {
        status: true,
        statusCode: 201,
        message: "Resources has been created"
    }
}

const ErrorConfig: {[key:string]:IBadResData} = {
    [HttpErrorStatus.BadRequest]: {
        status: false,        
        statusCode: 400,
        message: "Bad request: wrong format",
        error: "Bad Request"
    },
    [HttpErrorStatus.Unauthorized]:{
        status: false,
        statusCode: 401,
        message: "Invalid authorization: user need auth",
        error: "Unauthorized"
    },
    [HttpErrorStatus.Forbidden]:{
        status: false,
        statusCode: 403,
        message: "Forbidden: role need auth",
        error: "Forbidden"
    },
    [HttpErrorStatus.NotFound]:{
        status: false,
        statusCode: 404,
        message: "The requested resource is not available",
        error: "Not Found"
    },
    [HttpErrorStatus.NotAcceptable]:{
        status: false,
        statusCode: 406,
        message: "Not acceptable data format for DataBase require",
        error: "Not Acceptable",
    },
    [HttpErrorStatus.Conflict]:{
        status: false,
        statusCode: 409,
        message: "data already exists!",
        error: "Conflict"
    },
    [HttpErrorStatus.RequestOverSize]:{
        status: false,
        statusCode: 413,
        message: "Payload too large, do not over xxx MB",
        error: "Payload Too Large"
    },
    [HttpErrorStatus.InternalServerError]:{
        status: false,
        statusCode: 500,
        message: "Internal Server Error",
        error: "Internal Server Error"
    }
}

class ResHelper {  
    statusCode: HttpSuccessStatus | HttpErrorStatus;
    message: string | ValidationError[] | Error;
    resData?: any;
    error?: string;    

    constructor() {
        const success = SuccessConfig[200]
        this.statusCode = success.statusCode
        this.message = success.message
    }   

    setData(data:any) {
        this.resData = data
    }
    appendData(data:any) {
        this.resData = Object.assign({}, this.resData, data)
    }
    sendSuccessRes (res:Response, statusCode?: HttpSuccessStatus, message?: string) {
        if(statusCode) {
            const success = SuccessConfig[statusCode]
            this.statusCode = success.statusCode
            this.message = message ? message : success?.message
        } else if (message){
            this.message = message
        }

        const responseData:IGoodResData = {
            status: true,
            statusCode: this.statusCode as HttpSuccessStatus,
            message: this.message as string            
        }
        if(this.resData) {
            responseData.resData = this.resData
        }
        return res.status(responseData.statusCode).send(responseData)
    }

    sendErrorRes (res: Response, err: Error, statusCode?: HttpErrorStatus, message?: string):Response {
        let errorRes = ErrorConfig[HttpErrorStatus.InternalServerError]
        if(statusCode) {
            errorRes = ErrorConfig[statusCode]
        }
        this.statusCode = errorRes.statusCode
        this.message = message ? message : errorRes.message
        this.error = errorRes.error

        const responseData:IBadResData = {
            status: false,
            statusCode: this.statusCode,
            message: this.message,
            error: this.error
        }

        if(!isProduction()) {
            responseData.resData = err
        }
        return res.status(responseData.statusCode).send(responseData)
    }
}

export default ResHelper