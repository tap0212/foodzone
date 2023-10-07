import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { updateReduxState, updateUser, userSelector } from '../store/slices/appSlice';
import { ReduxApiStatus } from '../types';

export default function useAuth({ email, password }: { email: string; password: string }) {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const [message, setMessage] = useState<string>('');

  const callSignup = async () => {
    dispatch(updateReduxState(ReduxApiStatus.PENDING));
    try {
      if (email && password) {
        await auth().createUserWithEmailAndPassword(email, password);
        const currentUser = auth().currentUser;
        if (currentUser) {
          const token = await currentUser.getIdToken();
          if (token) {
            dispatch(updateUser({ ...user, token }));
          }
        }
        dispatch(updateReduxState(ReduxApiStatus.SUCCESS));
        setMessage('Loged in successfully!');
        console.log('Loged in successfully!');
      }
    } catch (error) {
      dispatch(updateReduxState(ReduxApiStatus.FAILED));
      if (error.code === 'auth/email-already-in-use') {
        setMessage('That email address is already in use!');
        console.log('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        setMessage('That email address is invalid!');
        console.log('That email address is invalid!');
      } else {
        setMessage('Something went wrong');
        console.error(error);
      }
    }
  };
  const callLogin = async () => {
    dispatch(updateReduxState(ReduxApiStatus.PENDING));
    try {
      if (email && password) {
        await auth().signInWithEmailAndPassword(email, password);
        const currentUser = auth().currentUser;
        if (currentUser) {
          const token = await currentUser.getIdToken();
          if (token) {
            dispatch(updateUser({ ...user, token }));
          }
        }

        dispatch(updateReduxState(ReduxApiStatus.SUCCESS));
        setMessage('User account created & signed in!');
        console.log('User account created & signed in!');
      }
    } catch (error) {
      dispatch(updateReduxState(ReduxApiStatus.FAILED));
      if (error.code === 'auth/email-already-in-use') {
        setMessage('That email address is already in use!');
        console.log('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        setMessage('That email address is invalid!');
        console.log('That email address is invalid!');
      } else {
        setMessage('Something went wrong');
        console.error(error);
      }
    }
  };
  return { message, callSignup, callLogin };
}
