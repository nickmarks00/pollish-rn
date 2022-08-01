import Constants from 'expo-constants';
import {
  REACT_APP_DEV_URL,
  REACT_APP_STAGING_URL,
  REACT_APP_PROD_URL,
} from '@env';

import logger from '../utilities/logger';

const settings = {
  dev: {
    apiUrl: REACT_APP_DEV_URL,
  },
  staging: {
    apiUrl: REACT_APP_STAGING_URL,
  },
  prod: {
    apiUrl: REACT_APP_PROD_URL,
  },
};

const getCurrentSettings = () => {
  if (__DEV__) {
    console.log('Running with development settings...');
    return settings.dev;
  }
  try {
    if (Constants.manifest.releaseChannel === 'staging')
      return settings.staging;
  } catch (error) {
    logger.log(new Error(error, 'Manifest release channel not set in build'));
  }

  return settings.prod;
};

export default getCurrentSettings();
