export class ApiResult {
    statusCode = 200
    message = "success"
    data= {}
    success(data, status?:number, message?: string) {
        this.data = data
        status ? this.statusCode = status : null
        message ? this.message = message : null
        return this;
    }
}