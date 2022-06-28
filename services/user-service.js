import baseService from './base-service';

export default (axios) => (resource) => ({
  ...baseService(axios, resource),
  paginateParticipant(params) {
    const payload = {
      params: {
        limit: '',
        sort_column: '',
        sort_type: '',
        page: 1,
        search_data: '',
        filter_column: '',
        filter_data: '',
        ...params,
      },
    };
    return axios.get(`${resource}/paginate-participant`, payload);
  },
  updateExponentPushToken(payload) {
    return axios.put(`${resource}/update-exponent-push-token`, payload);
  },
  getProfile() {
    return axios.get(`${resource}/get-profile`);
  },
});
