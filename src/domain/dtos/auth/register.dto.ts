export class RegisterDto {
  constructor(
    public readonly name: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static fromRequest(request: {
    [key: string]: string;
  }): [string?, RegisterDto?] {
    const { name, lastName, email, password } = request;

    if (!name) {
      return ["name is required"];
    }
    if (!lastName) {
      return ["lastName is required"];
    }
    if (!email) {
      return ["email is required"];
    }
    if (!password) {
      return ["password is required"];
    }
    return [undefined, new RegisterDto(name, lastName, email, password)];
  }
}
