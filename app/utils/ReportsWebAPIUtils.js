import $ from 'jquery';

const utils = {

  addNewReport: (data) => {
    return $.ajax({
      url: '/addReport',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  },

  getAllReports: () => {
    return $.ajax({
      url: '/myreports',
      type: 'GET'
    });
  }

};
export default utils;
