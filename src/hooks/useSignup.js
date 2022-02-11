import { useEffect, useState } from 'react';
import {
  setToken,
  getToken,
  getCodeVerifier,
  setCodeVerifier,
  getCodeState,
  setCodeState,
  createCodeChallenge,
  redirector,
  setClientId,
  setClientSecret,
  getClientSecret,
  getQueryParam,
  getClientId,
} from '../lib/utils';
import {
  HOME_PAGE_URL,
  DEFAULT_SCOPE,
  CODE_CHALLENGE_METHOD,
} from '../lib/constants';
import { getTokenFromServer } from '../lib/apiHelper';

export function useSignup() {
  const [isLogin, setIslogin] = useState(false);

  useEffect(() => {
    if (getToken()?.length) return setIslogin(true);
    if (getQueryParam('code')?.length && isValidCodeState())
      return fetchToken();

    setCodeVerifier();
    setCodeState();
    setClientId();
    setClientSecret();
    redirectToAuthServer();
  }, []);

  const redirectToAuthServer = () => {
    const authServerUrl = `https://www.oauth.com/playground/auth-dialog.html?response_type=code&client_id=${getClientId()}&redirect_uri=${HOME_PAGE_URL}&scope=${DEFAULT_SCOPE}&state=${getCodeState()}&code_challenge=${createCodeChallenge()}&code_challenge_method=${CODE_CHALLENGE_METHOD}`;
    redirector(authServerUrl);
  };

  const isValidCodeState = () => {
    return getCodeState() === getQueryParam('state');
  };

  const fetchToken = () => {
    const bodyData = {
      grant_type: 'authorization_code',
      client_id: getClientId(),
      client_secret: getClientSecret(),
      redirect_uri: HOME_PAGE_URL,
      code: getQueryParam('code'),
      code_verifier: getCodeVerifier(),
    };

    getTokenFromServer(bodyData).then((response) => {
      if (!response?.data?.access_token?.length) return;
      setToken(response?.data?.access_token);
      setIslogin(true);
    });
  };

  return { isLogin };
}
