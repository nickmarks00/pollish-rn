import {useContext} from 'react';

import {AuthContext} from './context';
import authApi from '../api/authApi';
import authStorage from '../auth/storage';

export default useAuth = () => {
  const {user, setUser, profile, setProfile} = useContext(AuthContext);

<<<<<<< HEAD
  const logIn = async authTokens => {
    const currentUser = await authStorage.getUser();
    const currentProfile = await authStorage.getProfile();
    setUser(currentUser);
    setProfile(currentProfile);
=======
  const loginWithTokens = async authTokens => {
    const currentUser = await authApi.getUser(authTokens);
    setUser(currentUser);
>>>>>>> main
    authStorage.storeTokens(JSON.stringify(authTokens));
  };

  const logOut = () => {
    setUser(null);
    setProfile(null);
    authStorage.removeTokens();
  };

<<<<<<< HEAD
  return {user, profile, logIn, logOut};
=======
  return {user, loginWithTokens, logOut};
>>>>>>> main
};
