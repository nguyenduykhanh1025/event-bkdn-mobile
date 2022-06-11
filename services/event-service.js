import baseService from './base-service'

export default axios => resource => ({
  ...baseService(axios, resource),
  paginateEventIncoming(params) {
    const payload = {
      params: {
        limit: '',
        sort_column: '',
        sort_type: '',
        page: 1,
        search_data: '',
        filter_column: '',
        filter_data: '',
        ...params
      }
    }
    return axios.get(`${resource}/paginate-event-incoming`, payload)
  },
  paginateEventHappening(params) {
    const payload = {
      params: {
        limit: '',
        sort_column: '',
        sort_type: '',
        page: 1,
        search_data: '',
        filter_column: '',
        filter_data: '',
        ...params
      }
    }
    return axios.get(`${resource}/paginate-event-happening`, payload)
  },
  paginateEventOver(params) {
    const payload = {
      params: {
        limit: '',
        sort_column: '',
        sort_type: '',
        page: 1,
        search_data: '',
        filter_column: '',
        filter_data: '',
        ...params
      }
    }
    return axios.get(`${resource}/paginate-event-over`, payload)
  },
  getEventsParticipating() {
    return axios.get(`${resource}/get-events-participating`)
  },
  getEventsJoined() {
    return axios.get(`${resource}/get-events-joined`)
  },
  getEventsInComming() {
    return axios.get(`${resource}/get-events-in-comming`)
  },
  getEventsJoin() {
    return axios.get(`${resource}/get-events-join`)
  },
  getEventsNewNotExistUser() {
    return axios.get(`${resource}/get-events-new-not-exist-user`)
  }
})
