import { HttpException, HttpStatus } from '@nestjs/common';


export class ValidationException extends HttpException {
  messages: string;

  constructor(resp) {
    super(resp, HttpStatus.BAD_REQUEST)
    this.messages = resp
  }
}