import {useContext} from 'react';

import {AuthContext} from './context';
import authApi from '../api/authApi';

export default useAuth = () => {
  const {user, setUser} = useContext(AuthContext);

  const loginWithTokens = async authTokens => {
    const currentUser = await authApi.getUser();
    console.log(`from loginwithtokens ${currentUser}`);
    setUser(currentUser);
    authStorage.storeTokens(JSON.stringify(authTokens));
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeTokens();
  };

  return {user, loginWithTokens, logOut};
};
