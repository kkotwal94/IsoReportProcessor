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
  getGlobalReports: () => {
    return $.ajax({
      url: '/allReports',
      type: 'GET'
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

  getSingleReportFinal: (id) => {
    return $.ajax({
      url: '/finalView/' + id,
      type: 'GET' 
    });
  },

  addSubReport: (data) => {
    return $.ajax({
      url: '/subreport',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  },
  
  assignToEmployee: (data) => {
    return $.ajax({
      url: '/assignReport',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
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
  },

  setReportComplete: (data) => {
    return $.ajax({
      url: '/complete',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  }

};
export default utils;
