import axios from "axios"

const REST_URL = 'http://localhost:9000/api/users'
const REST_URL_EMAIL = 'http://localhost:9000/api';


export const createUser = (user) => axios.post(REST_URL + '/register', user)

export const getUser = (user) => axios.post(REST_URL + '/login', user )

export const getDonors = async () => {
    return await axios.get(REST_URL + '/donors');
  };

  export const addDonor = (donor) => {
    return axios.post(REST_URL + '/donors', donor);
  };

export const addPatient = (patient) => axios.post(REST_URL + '/patients', patient)

export const getPatients = () => {
  return axios.get(REST_URL + '/patients');
};

export const deletePatient = (id) => {
  return axios.delete(REST_URL + `/patient/${id}`)
}

export const deleteDonor = (id) => {
  return axios.delete(REST_URL + `/donor/${id}`)
}

export const addRequest = (request) => axios.post(REST_URL + '/requests', request)

export const getRequests = async () => axios.get(REST_URL + '/requests')

export const delRequest = (id) => axios.delete(REST_URL + `/request/${id}`)

// export const getRequestById = (id) => axios.get(REST_URL + `/request/${id}`)


export const resetPasswordRequest = (email) => {
  return axios.post(REST_URL_EMAIL + '/send-password/reset-email', { email });
};