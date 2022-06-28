import {BASE_URL} from '@env';
import client from '../api/client';

export const validateName = name => {
  const re = /^[A-Z][a-zA-Z]{3,15}$/;

  if (name.length < 2) {
    return {isValid: false, error: 'Name is too short'};
  }

  if (!re.test(name)) {
    return {
      isValid: false,
      error: 'Invalid name',
    };
  }

  return {isValid: true, error: null};
};

export const validateUsername = async username => {
  /* 
    Username must:
    - be at least 3 characters long
    - no more than 15 characters long
    - pass a specified regex
    - not already exist in the database
    */

  const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  if (username.length < 3) {
    return {isValid: false, error: 'Username is too short'};
  }

  if (username.length > 25) {
    return {isValid: false, error: 'Username is too long'};
  }

  if (!re.test(username)) {
    return {isValid: false, error: 'Not the right format for a username'};
  }

  try {
    const response = await client.get(`/core/users/?username=${username}`);
    if (response.status === 200) {
      return response.data.length
        ? {isValid: false, error: 'This username already exists'}
        : {isValid: true, error: null};
    } else {
      throw new Error('Bad network response');
    }
  } catch (e) {
    console.error(e);
  }

  return {isValid: true, error: null};
};

export const validateEmailUnique = async email => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(email)) {
    return {isValid: false, error: 'Please provide a valid email'};
  }

  try {
    const response = await client.get(`/core/users/?email=${email}`);
    if (response.status === 200) {
      return (
        response.data.length && {
          isValid: false,
          error: 'This email already exists',
        }
      );
    } else {
      throw new Error('Bad network response');
    }
  } catch (e) {
    console.error(e);
  }

  return {isValid: true, error: null};
};

export const validateAccountExistsWithEmail = async email => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(email)) {
    return {isValid: false, error: 'Please provide a valid email'};
  }

  try {
    const response = await client.get(`/core/users/?email=${email}`);
    if (response.status === 200) {
      return response.data.length
        ? {isValid: true, error: null}
        : {isValid: false, error: 'No account with this email...'};
    } else {
      Promise.reject('Bad network response');
    }
  } catch (e) {
    console.error(e);
  }

  return {isValid: true, error: null};
};

export const validatePassword = password => {
  const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  if (!re.test(password)) {
    return {
      isValid: false,
      error:
        'Minimum eight characters, at least one upper case letter, one lower case letter, one number and one special character',
    };
  }

  return {isValid: true, error: null};
};
