import {useContext} from 'react';

import {AuthContext} from './context';
import authApi from '../api/authApi';
import authStorage from '../auth/storage';

export default useAuth = () => {
  const {user, setUser} = useContext(AuthContext);

  const loginWithTokens = async authTokens => {
    const currentUser = await authApi.getUser(authTokens);
    setUser(currentUser);
    authStorage.storeTokens(JSON.stringify(authTokens));
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeTokens();
  };

  return {user, loginWithTokens, logOut};
};
