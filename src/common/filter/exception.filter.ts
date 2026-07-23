import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";


@Catch()
export class GlobalExceptionFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost){
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let errors = null;

        if(exception instanceof HttpException){
            status = exception.getStatus();
            const errorResponse = exception.getResponse();

            if(typeof errorResponse === 'string'){
                message = errorResponse;
            }else if(typeof errorResponse === 'object'){
                message = errorResponse.message || message;
                errors = errorResponse.errors || null; 
            }
        }

        response.status(status).json({
            statusCode: status,
            success: false,
            message: message,
            errors: errors,
        });
    }
}