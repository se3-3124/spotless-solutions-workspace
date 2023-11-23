// eslint-disable-next-line node/no-unpublished-import
import {mockDeep} from 'jest-mock-extended';
import {ISessionTokenIssuer} from '../../services/authentication/ISessionTokenIssuer';

export function mockSession() {
  const mock = mockDeep<ISessionTokenIssuer>();

  mock.sign.mockReturnValue(
    Promise.resolve({
      token: 'example_token',
      refreshToken:
        '7pJDj83IW53j8KMVAbyyCDVCB/M3LTHj7WYgVytC/Q/bJx+GUG319JiAdmBz7gI1BMkx/mskJ13zfDlgmUMopA==',
    })
  );

  return mock;
}
