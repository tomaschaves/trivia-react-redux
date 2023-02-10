import md5 from 'crypto-js/md5';
import { SAVE_EMAIL } from './actionTypes';

export const actionGetGravatar = (localState) => {
  const emailMD5 = md5(localState.email).toString();
  return {
    type: SAVE_EMAIL,
    payload: [
      localState.nameUser, emailMD5,
    ],
  };
};
