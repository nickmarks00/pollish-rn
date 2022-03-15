import {useContext} from 'react';

import {AuthContext} from './context';
import authStorage from './storage';

export default useAuth = () => {
  const {user, setUser} = useContext(AuthContext);

  const logIn = async authTokens => {
    console.log("hsa9i");
    const user = await authStorage.getUser();
    setUser(user);
    console.log("look");
    authStorage.storeTokens(JSON.stringify(authTokens));
    console.log("h9i");
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeTokens();
  };

  return {user, logIn, logOut};
};
