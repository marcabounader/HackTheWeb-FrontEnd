import axios from 'axios';
import { useSelector } from 'react-redux';

const baseUrl = 'http://192.168.1.29:8000';
// const baseUrl = 'http://3.248.194.204/api/';
const Auth = () => {
  // const { token } = JSON.parse(localStorage.getItem('user'));
  const user = useSelector((state) => state.user);
  const { user_id, token, name, type_id, rank } = user;

  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

async function logIn({ email, password }) {
  try {
    const res = await axios.post(`${baseUrl}login`, {
      email,
      password,
    });
    if (res.status === 200) {
      const data = res.data;
      return { data };
    }
  } catch (error) {
    console.log(error);
    const {
      response: {
        data: { message, errors },
      },
    } = error;

    if (errors) {
      const errorMessages = Object.keys(errors).map((key) => {
        const firstError = errors[key][0];
        if (firstError) {
          return firstError;
        }
      });
      return { errorMessages };
    }
    return { message };
  }
}

async function logOut(token) {
  try {
    const res = await axios.post(`${baseUrl}/api/logout`, undefined,{headers: { Authorization: `Bearer ${token}` }});
    console.log(res.data);
    if (res.status === 200) {
      const data = res.data;
      return { data };
    }
  } catch (error) {
    const {
      response: {
        data: { message, errors },
      },
    } = error;

    if (errors) {
      const errorMessages = Object.keys(errors).map((key) => {
        const firstError = errors[key][0];
        if (firstError) {
          return firstError;
        }
      });
      return { errorMessages };
    }
    return { message };
  }
}

async function register({password,name, email }) {
  try {
    const res = await axios.post(`${baseUrl}/api/register`, {
      email,
      password,
      name,
    });
    if (res.status === 200) {
      const data = res.data;
      return { data };
    }
  } catch (error) {
    const {
      response: {
        data: { message, errors },
      },
    } = error;

    if (errors) {
      const errorMessages = Object.keys(errors).map((key) => {
        const firstError = errors[key][0];
        if (firstError) {
          return firstError;
        }
      });
      return { errorMessages };
    }
    return { message };
  }
}

export { logIn, Auth ,register,logOut,baseUrl};
