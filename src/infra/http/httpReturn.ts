export class HttpReturn {
  static ok<T>(msg: T) {
    return {
      statusCode: 200,
      message: { message: msg },
    };
  }
  static badRequest(msg: string) {
    return {
      statusCode: 400,
      message: { error: msg },
    };
  }
  static InternalServerError(msg: string) {
    return {
      statusCode: 500,
      message: "Internal server error",
    };
  }
}
