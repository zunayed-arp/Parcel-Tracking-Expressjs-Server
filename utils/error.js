export class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    return 400;
  }
}

export class BadRequest extends GeneralError {
  constructor(message) {
    super(message);
    this.name = "Bad request";
  }

  getCode() {
    return 400;
  }
}

export class NotFound extends GeneralError {
  constructor(message) {
    super(message);
    this.name = "Not Found";
  }

  getCode() {
    return 404;
  }
}
