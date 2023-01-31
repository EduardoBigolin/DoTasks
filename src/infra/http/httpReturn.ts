export class HttpReturn {
  static ok(msg: string) {
    return {
      statusCode: 200,
      message: msg,
    };
  }
  static badRequest(msg: string) {
    return {
      statusCode: 400,
      message: msg,
    };
  }
  static InternalServerError(msg: string) {
    return {
      statusCode: 500,
      message: "Internal server error",
    };
  }
}
