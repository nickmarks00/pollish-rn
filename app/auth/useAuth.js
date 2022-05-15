import {useContext} from 'react';

import {AuthContext} from './context';
import authStorage from './storage';

export default useAuth = () => {
  const {user, setUser} = useContext(AuthContext);

  const logIn = async authTokens => {
    const users = await authStorage.getUser();
    setUser(users);
    authStorage.storeTokens(JSON.stringify(authTokens));
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeTokens();
  };

  return {user, logIn, logOut};
};
