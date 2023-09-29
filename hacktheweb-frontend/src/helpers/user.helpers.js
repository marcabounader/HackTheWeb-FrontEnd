import axios from "axios";

import { baseUrl } from "./auth.helpers";


  async function getStatistics(token) {
    try {
      const res = await axios.get(`${baseUrl}/api/hacker/statistics`, {headers: { Authorization: `Bearer ${token}` }});
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

  async function getBotResponse(token,prompt) {
    try {
      const res = await axios.post(`${baseUrl}/api/hacker/chat`,{prompt}, {headers: { Authorization: `Bearer ${token}` }});
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
  async function getTopTen(token) {
    try {
      const res = await axios.get(`${baseUrl}/api/common/top-ten`, {headers: { Authorization: `Bearer ${token}` }});
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
  
  async function getUserBadges(token) {
    try {
      const res = await axios.get(`${baseUrl}/api/hacker/get-my-badges`, {headers: { Authorization: `Bearer ${token}` }});
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

async function getLabs(token,page) {
  try {
    const res = await axios.get(`${baseUrl}/api/hacker/get-labs?page=${page}`, {headers: { Authorization: `Bearer ${token}` }});
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
    const res = await axios.get(`${baseUrl}/api/hacker/get-active-labs`, {headers: { Authorization: `Bearer ${token}` }});
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
    const res = await axios.get(`${baseUrl}/api/hacker/get-completed-labs`, {headers: { Authorization: `Bearer ${token}` }});
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

async function launchLab(token,lab_id,launch_api) {
  try {
    const res = await axios.post(`${baseUrl}${launch_api}`,{lab_id}, {headers: { Authorization: `Bearer ${token}` }});
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

async function saveProfile(token,object) {
  try {
    const res = await axios.put(`${baseUrl}/api/hacker/modify-profile`,object, {headers: { Authorization: `Bearer ${token}` }});
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

async function submitFlag(token,lab_id,flag,project_name) {
  try {
    const res = await axios.post(`${baseUrl}/api/hacker/submit-flag`,{id:lab_id,flag,project_name}, {headers: { Authorization: `Bearer ${token}` }});
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
    const res = await axios.delete(`${baseUrl}/api/hacker/stop-user-lab/${modifiedString}`, {headers: { Authorization: `Bearer ${token}` }});
    
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


const getSVG = async (icon_url) => {
  try {
    const res = await axios.get(`${icon_url}`, {
      headers: {
        'Content-Type': 'image/svg+xml',
      },
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
};
async function searchBadges(token,query,page,perPage) {
  try {
    const res = await axios.get(`${baseUrl}/api/hacker/search-badges?page=${page}&perPage=${perPage}&query=${query}`, {headers: { Authorization: `Bearer ${token}` }});
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

  export {getStatistics,searchBadges,getBotResponse,getUserBadges,saveProfile,getTopTen,getLabs,getActiveLabs,getCompletedLabs,stopLab,launchLab,submitFlag, getSVG};