import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";


@Catch()
export class GlobalExceptionFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost){
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status = exception instanceof HttpException? exception.getStatus(): HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let errors = null;

        if(exception instanceof HttpException){
            const exceptionResponse = exception.getResponse();

            if(typeof exceptionResponse === 'string'){
                message = exceptionResponse;
            }else if(typeof exceptionResponse === 'object' && exceptionResponse !== null){
                const errorObj = exceptionResponse as {message?: string; errors?: any; error?: any};
                message = errorObj.message || message;
                errors = errorObj.errors || errorObj.error || null; 
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