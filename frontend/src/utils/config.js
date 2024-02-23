export const api = import.meta.env.VITE_API_ENDPOINT || '';
export const uploads = import.meta.env.VITE_UPLOAD_ENDPOINT || '';

export const requestConfig = (method, data, token = null, image = false) => {
  let config;

  if (image) {
    config = {
      method,
      body: data,
      headers: {},
    };
  } else if (method === 'DELETE' || !data) {
    config = {
      method,
      headers: {},
    };
  } else {
    config = {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};
