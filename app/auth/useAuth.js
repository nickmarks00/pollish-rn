import {useContext} from 'react';

import {AuthContext} from './context';
import authStorage from './storage';

export default useAuth = () => {
  const {user, setUser, profile, setProfile} = useContext(AuthContext);

  const logIn = async authTokens => {
    const currentUser = await authStorage.getUser();
    const currentProfile = await authStorage.getProfile();
    setUser(currentUser);
    setProfile(currentProfile);
    authStorage.storeTokens(JSON.stringify(authTokens));
  };

  const logOut = () => {
    setUser(null);
    setProfile(null);
    authStorage.removeTokens();
  };

  return {user, profile, logIn, logOut};
};
