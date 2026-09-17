import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { response } from 'express';
import { map, Observable } from 'rxjs';
import { PaginatedResult } from '../data-access';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    
    return next.handle().pipe(map((response=>{
      //Case1:empty response (response===mull)
      if(!response) return{data:[]}
      //Case2 : pagination response
      if(response instanceof PaginatedResult)
      return{
          data:response.data,
          meta:{
            page:response.page,
            limit:response.limit,
            pageCount:response.pageCount,
            totalCount:response.totalCount
          }
        }
        //Case3:regular response
        return {
          data:response
        }

         
    })));
  }
}
