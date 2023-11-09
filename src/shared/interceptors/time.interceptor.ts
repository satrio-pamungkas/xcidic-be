import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, catchError, tap } from "rxjs";
import { Response } from "express";

@Injectable()
export class TimeInterceptor implements NestInterceptor {
  constructor(
  ) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const initialTimes = Date.now();

    const response = context.switchToHttp().getResponse<Response>();

    let isExceptionOccured = false;

    return next.handle().pipe()
  }
}