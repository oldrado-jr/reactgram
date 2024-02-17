import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useAuth = () => {
  const { user } = useSelector((state) => state.auth);

  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuth(user !== null);
    setLoading(false);
  }, [user]);

  return {
    auth,
    loading,
  };
};

export default useAuth;
