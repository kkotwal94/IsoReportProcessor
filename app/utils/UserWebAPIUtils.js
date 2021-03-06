import $ from 'jquery';

const utils = {
  /*
   * @param {Object} payload to be sent to server
   * @return {Promise}
   */
  manuallogin: (data) => {
    return $.ajax({
      url: '/login',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  },

  /*
   * @return {Promise}
   */
  logout: () => {
    return $.ajax({
      url: '/logout',
      type: 'GET'
    });
  },

  /*
   * @return {Promise}
   */
  myProfile: () => {
    return $.ajax({
      url: '/myProfile',
      type: 'GET',
      cache:false
    });
  },

  updateMyProfile: (data) => {
    return $.ajax({
      url: '/updateProfile',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  },
  handleEmployee: (data) => {
    return $.ajax({
      url: '/handleEmployee',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  },
  getAllEmployees: () => {
    return $.ajax({
      url: '/allUsers',
      type: 'GET',
      cache:false
    });
  },

  getMyEmployees: () => {
    return $.ajax({
      url: '/myEmployees',
      type: 'GET',
      cache:false
    });
  },

  getList: () => {
    return $.ajax({
      url: '/list',
      type: 'GET',
      cache: false
    });
  },
  /*
   * @param {Object} payload to be sent to server
   * @return {Promise}
   */
  signup: (data) => {
    return $.ajax({
      url: '/signup',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  }

};

export default utils;
