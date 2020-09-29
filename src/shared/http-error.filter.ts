import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const rq = ctx.getRequest();
        const rs = ctx.getResponse();
        const status = exception.getStatus();

        const errorResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: rq.url,
            method: rq.method,
            message: exception.message.error
        }
        rs.status(status).json(errorResponse);
    }
}