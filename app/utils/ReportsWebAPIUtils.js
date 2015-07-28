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
  },

  getSingleReport: (id) => {
    return $.ajax({
      url: '/report/' + id,
      type: 'GET'
    });
  },

  editSingleReport: (data) => {
    return $.ajax({
      url: '/singleReportEdit',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  },

  removeSingleReport: (data) => {
    return $.ajax({
      url: '/removeReport',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  }

};
export default utils;
