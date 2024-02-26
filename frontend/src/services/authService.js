import { api, fetchAPI, requestConfig } from '../utils/config';

// Register an user
const register = async (data) => {
  const config = requestConfig('POST', data);

  try {
    const response = await fetchAPI(`${api}/users/register`, config);

    if (response && !response.errors) {
      localStorage.setItem('user', JSON.stringify(response));
    }

    return response;
  } catch (error) {
    console.error(error);
  }
};

// Logout an user
const logout = () => {
  localStorage.removeItem('user');
};

// Sign in an user
const login = async (data) => {
  const config = requestConfig('POST', data);

  try {
    const response = await fetchAPI(`${api}/users/login`, config);

    if (response && !response.errors) {
      localStorage.setItem('user', JSON.stringify(response));
    }

    return response;
  } catch (error) {
    console.error(error);
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
