import axios from 'axios';

export const login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:8000/api/users', {email, password},
    {
      headers: {
        'Access-Control-Allow-Origin':'*',
      },
    });
    if(response.status === 200){
      localStorage.setItem('userName', response.data.name);
      localStorage.setItem('userId', response.data.id);
    }
    return response;

  } catch (error) {
    return error.response.data.message;
  }
}

export const register =  async (name, email, password) => {
  try {
    const response = await axios.post('http://localhost:8000/api/users/register', {email, password, name},
    {
      headers: {
        'Access-Control-Allow-Origin':'*',
      },
    });
    if(response.status === 200){
      localStorage.setItem('userName', response.data.user.name);
      localStorage.setItem('userId', response.data.user.id);
    }
    console.log("first", response)
    return response;

  } catch (error) {
    return error.response.data.message;
  }
}

export const profile = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/user/profile/${userId}`,
    {
      headers: {
        'Access-Control-Allow-Origin':'*',
      },
    });

    if(response.status === 200){
      return response.data;
    }

  } catch (error) {
    return console.log(error);
  }
}

  export const updateProfile = async ({name, email, address, city}, userId) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/user/profile/update/${userId}`, {name, email, address, city},
      {
        headers: {
          'Access-Control-Allow-Origin':'*',
        },
      });
      if(response.status === 200){
        return response;
      }

    } catch (error) {
      return console.log(error);
    }
  }