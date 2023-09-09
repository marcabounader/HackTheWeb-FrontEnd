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
async function getActiveLabs(token) {
  try {
    const res = await axios.get(`${baseUrl}hacker/get-active-labs`, {headers: { Authorization: `Bearer ${token}` }});
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
async function getCompletedLabs(token) {
  try {
    const res = await axios.get(`${baseUrl}hacker/get-completed-labs`, {headers: { Authorization: `Bearer ${token}` }});
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

async function stopLab(token,project_name) {
  try {
    const modifiedString = project_name.replace(/_\d+$/, '');

    const res = await axios.delete(`${baseUrl}hacker/stop-user-lab/${modifiedString}`, {headers: { Authorization: `Bearer ${token}` }});
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
  export {getStatistics,getLabs,getActiveLabs,getCompletedLabs,stopLab};