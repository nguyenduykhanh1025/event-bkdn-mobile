import baseService from './base-service'

export default axios => resource => ({
  ...baseService(axios, resource),
  login(payload) {
    return axios.post(`${resource}/login`, payload)
  },
  registerParticipantAccount(payload) {
    return axios.post(`${resource}/register-participant-account`, payload)
  }
})
