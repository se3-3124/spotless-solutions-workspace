import crypto from 'crypto';
import {
  ISessionTokenIssuer,
  IssuedToken,
  TokenIssuerError,
  TokenValid,
} from '../../services/authentication/ISessionTokenIssuer';
import jwt, {SignOptions} from 'jsonwebtoken';

export default class SessionMock implements ISessionTokenIssuer {
  private readonly _jwtConfig: object = {
    expiresIn: '1h',
    notBefore: '5s',
    algorithm: 'HS256',
  };

  private readonly _jwtSecret: string = crypto
    .randomBytes(32)
    .toString('base64');

  async sign(
    userId: number,
    email: string
  ): Promise<IssuedToken | TokenIssuerError> {
    return {
      token: jwt.sign(
        {
          userId,
          email,
        },
        this._jwtSecret,
        this._jwtConfig as SignOptions
      ),
      refreshToken: crypto.randomBytes(64).toString('base64'),
    };
  }
  verify(token: string): TokenIssuerError | TokenValid {
    try {
      jwt.verify(token, this._jwtSecret);
      return {valid: true};
    } catch (e) {
      return {error: true, message: 'Invalid token'};
    }
  }
  async refresh(
    token: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    refreshToken: string
  ): Promise<IssuedToken | TokenIssuerError> {
    try {
      const sessionToken = jwt.verify(
        token,
        this._jwtSecret,
        this._jwtConfig as SignOptions
      ) as {userId: number; email: string};
      return this.sign(sessionToken.userId, sessionToken.email);
    } catch (e) {
      return {error: true, message: 'Invalid token'};
    }
  }
}
