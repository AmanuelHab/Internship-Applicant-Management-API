import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { ApiResponse } from "../interfaces/response.interface";
import { Observable } from "rxjs";
import { map } from "rxjs/operators"


@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>>{
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>> | Promise<Observable<ApiResponse<T>>> {
        return next.handle().pipe(
            map((data) =>{
                if (data && typeof data === 'object' && 'success' in data){
                    return data as unknown as ApiResponse<T>;
                }

                return {
                    statusCode: context.switchToHttp().getResponse().statusCode || 200,
                    success: true,
                    message: 'Success',
                    data,
                };
            })
        );
    }
}