export interface IApplicationError {
  HttpCode: number;
}

export class ApplicationError extends Error implements IApplicationError {
  private _httpCode: number;

  public get HttpCode(): number {
    return this._httpCode;
  }
  public set HttpCode(value: number) {
    this._httpCode = value;
  }

  constructor({ httpCode = 500, message }) {
    super(message);

    this.HttpCode = httpCode;
  }
}
