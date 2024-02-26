import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout, reset } from '../slices/authSlice';

const useCheckAuth = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's auth user data in local storage
    if (user) {
      return;
    }

    // In case there's no data, clear all auth states and redirect user to login page
    dispatch(logout());
    dispatch(reset());

    navigate('/login');
  }, [user, dispatch, navigate]);
};

export default useCheckAuth;
