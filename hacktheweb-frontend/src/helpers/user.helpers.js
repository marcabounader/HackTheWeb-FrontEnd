import axios from "axios";

const baseUrl = 'http://localhost:8000/api/';



async function getStatistics(token) {
    try {
      const res = await axios.get(`${baseUrl}hacker/statistics`, {headers: { Authorization: `Bearer ${token}` }});
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
  
async function getLabs(token) {
  try {
    const res = await axios.get(`${baseUrl}common/get-labs`, {headers: { Authorization: `Bearer ${token}` }});
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

  export {getStatistics,getLabs};