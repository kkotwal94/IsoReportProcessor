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
      type: 'GET',
      crossDomain: true,
      cache:false
    });
  },
  
  getAllReports: () => {
    return $.ajax({
      url: '/myreports',
      type: 'GET',
      crossDomain: true,
      cache:false
    });
  },
  
  getSingleReport: (id) => {
    return $.ajax({
      url: '/report/' + id,
      type: 'GET',
      crossDomain: true,
      cache:false
    });
  },

  getSingleReportFinal: (id) => {
    return $.ajax({
      url: '/finalView/' + id,
      type: 'GET' ,
      crossDomain: true,
      cache:false
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
  },

  addJoinList: (data) => {
    return $.ajax({
      url: '/joinList',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
  });
  },

  join: () => {
    return $.ajax({
      url: '/join',
      type: 'POST',
      contentType: 'application/json'
    });
  },

  setTitle: (data) => {
  return $.ajax({
    url: '/setTitle',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data)
  });
 },

 removeJoinDoc: (data) => {
  return $.ajax({
    url: '/removeJoinDoc',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data)
  });
},

removeallJoinDoc: () => {
  return $.ajax({
    url: '/removeallJoinDoc',
    type: 'POST',
    contentType: 'application/json'
  });
}

};
export default utils;
