class HttpStatus {
  // 200s - SUCCESS
  static readonly OK = 200;
  static readonly CREATED = 201;
  static readonly NO_CONTENT = 204;

  // 300s - REDIRECTION
  static readonly MOVED_PERMANENTLY = 301;
  static readonly FOUND = 302;
  static readonly NOT_MODIFIED = 304;
  static readonly TEMPORARY_REDIRECT = 307;

  // 400s - CLIENT ERROR
  static readonly BAD_REQUEST = 400;
  static readonly UNAUTHORIZED = 401;
  static readonly FORBIDDEN = 403;
  static readonly NOT_FOUND = 404;
  static readonly METHOD_NOT_ALLOWED = 405;
  static readonly CONFLICT = 409;
  static readonly TOO_MANY_REQUESTS = 429;

  // 500s - SERVER ERROR
  static readonly INTERNAL_SERVER_ERROR = 500;
  static readonly BAD_GATEWAY = 502;
  static readonly SERVICE_UNAVAILABLE = 503;
  static readonly GATEWAY_TIMEOUT = 504;

  // Helper
  static isError(status: number): boolean {
    return status >= 400;
  }

  static isSuccess(status: number): boolean {
    return status >= 200 && status < 300;
  }
}

export default HttpStatus;
