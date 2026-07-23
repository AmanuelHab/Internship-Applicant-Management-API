import { ApiResponse } from "../interfaces/response.interface"

export class ResponseUtil{
    static success<T>(statusCode: number = 200, message: string = 'Success', data?: T): ApiResponse<T>{
        return {statusCode, success: true, message, data};
    }

    static error(statusCode: number = 400, message: string = 'Error', errors?: any): ApiResponse<null>{
        return { statusCode, success: false, message, errors };
    }
}