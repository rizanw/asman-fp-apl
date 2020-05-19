import jwt, { Secret } from "jsonwebtoken";

export class JWTToken {
  constructor(private readonly secret: Secret) {}

  public generateToken(
    payload: any,
    subject: string | undefined,
    issuer: string | undefined,
    notBefore: string | number | undefined,
    expiresIn: string | number | undefined
  ): string {
    return jwt.sign(payload, this.secret, {
      subject: subject,
      issuer: issuer,
      notBefore: notBefore,
      expiresIn: expiresIn,
    });
  }

  public decodeToken(token: string): object | string | null {
    try {
      return jwt.verify(token, this.secret);
    } catch {
      return null;
    }
  }
}
