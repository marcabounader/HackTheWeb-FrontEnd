import axios from "axios";

const baseUrl = 'http://localhost:8000';
// const baseUrl = 'http://3.248.194.204';

async function searchLabs(token,query,page) {
    try {
      const res = await axios.get(`${baseUrl}/api/common/search-labs?page=${page}&query=${query}`, {headers: { Authorization: `Bearer ${token}` }});
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
  async function searchBadges(token,query,page) {
    try {
      const res = await axios.get(`${baseUrl}/api/common/search-badges?page=${page}&query=${query}`, {headers: { Authorization: `Bearer ${token}` }});
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
export{searchLabs,searchBadges};