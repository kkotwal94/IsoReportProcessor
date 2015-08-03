import ReportsActions from 'actions/ReportsActions';
import alt from 'altInstance';

var treecycle = (data, arr) => {
  if(data.subreport.length != 0)
    for(var x = 0; x < data.subreport.length; x++)
    {
        arr.push(data.subreport[x]);
        if(data.subreport[x].subreport.length != 0) {
           treecycle(data.subreport[x], arr);
        }
    }
};

class ReportsStore {
constructor() {
    // Instance variables defined anywhere in the store will become the state. You can initialize these in the constructor and
    // then update them directly in the prototype methods
    // (lifecycleMethod: string, handler: function): undefined
    // on: This method can be used to listen to Lifecycle events. Normally they would set up in the constructor
    this.reports = [];
    this.singleReport = [];
    this.editReport = [];
    this.notComplete = [];
    this.newReport = [];
    this.globalreports = [];
    this.isWaiting;
    this.isWaiting2;
    this.isWaiting3;
    this.isWaitingGet;
    // (listenersMap: object): undefined
    // bindListeners accepts an object where the keys correspond to the method in your
    // StoreModel and the values can either be an array of action symbols or a single action symbol.
    // Remember: alt generates uppercase constants for us to reference
    this.bindListeners({
        handleAddNewReport: ReportsActions.ADD_NEW_REPORT,
        handleAddNewReportSuccess: ReportsActions.ADD_NEW_REPORT_COMPLETE,
        handleMyReports: ReportsActions.GET_MY_REPORTS,
        handleMyReportsComplete: ReportsActions.GET_MY_REPORTS_COMPLETE,
        handleMyReportsError: ReportsActions.GET_MY_REPORTS_ERROR,
        handleSingleReport: ReportsActions.GET_SOLO_REPORT,
        handleSingleReportComplete: ReportsActions.GET_SOLO_REPORT_COMPLETE,
        handleSingleReportError: ReportsActions.GET_SOLO_REPORT_ERROR,
        handleEditReport: ReportsActions.EDIT_REPORT,
        handleEditReportSuccess: ReportsActions.EDIT_REPORT_COMPLETE,
        handleRemoveReport: ReportsActions.REMOVE_REPORT,
        handleRemoveReportSuccess: ReportsActions.REMOVE_REPORT_COMPLETE,
        handleSubReport: ReportsActions.ADD_SUB_REPORT,
        handleSubReportSuccess: ReportsActions.ADD_SUB_REPORT_COMPLETE,
        handleAssignedReport: ReportsActions.ADD_ASSIGNED_REPORT,
        handleAssignedReportSuccess: ReportsActions.ADD_ASSIGNED_REPORT_COMPLETE,
        handleGlobalReports: ReportsActions.GET_GLOBAL_REPORTS,
        handleGlobalReportsSuccess: ReportsActions.GET_GLOBAL_REPORTS_COMPLETE,
        handleGlobalReportsError: ReportsActions.GET_GLOBAL_REPORTS_ERROR
    });
  }

  handleGlobalReports() {
    this.globalreports = [];
    this.notComplete = [];
    this.newReport = [];
    this.isWaitingGet = true;
    this.emitChange();
  }

  handleGlobalReportsSuccess(data) {
    let filler = [];
    let incomplete = [];
    let id = data[data.length-1];
    for(let i = 0; i < data.length; i++) {
      if(data[i].author == id || data[i].owner == id){
        filler.push(data[i]);
        if(data[i].isCompleted == false) {
          incomplete.push(data[i]);
        }
      }
    }

    filler.sort(function(a, b) {
    a = new Date(a.date);
    b = new Date(b.date);
    return a>b ? -1 : a<b ? 1 : 0;
});
    this.globalreports = filler;

    incomplete.sort(function(a, b) {
    a = new Date(a.date);
    b = new Date(b.date);
    return a>b ? -1 : a<b ? 1 : 0;
});
    this.notComplete = incomplete;
    this.isWaitingGet = false;
    this.newReport = data[data.length - 1]._id;
    this.emitChange();
  }

  handleGlobalReportsError(error) {
    this.error = error;
    this.emitChange();
  }

  handleAssignedReport() {
    this.isWaiting3 = true;
    this.emitChange();
  }

  handleAssignedReportSuccess(data) {
    this.isWaiting3 = false;
    this.emitChange();
  }
   
  handleSubReport() {
    this.isWaiting2 = true;
    this.emitChange();
} 

  handleSubReportSuccess(data){
    this.isWaiting2 = false;
    this.emitChange();
  }
  handleAddNewReport() {
    this.isWaiting = true;
    this.emitChange();
  }

  handleSingleReport() {
    this.singleReport = [];
    this.editReport = [];
  }

  handleEditReport() {
  }
  
  handleRemoveReport(data) {
   this.emitChange();
  }

  handleRemoveReportSuccess(data) {

  }
  handleEditReportSuccess(data) {
    this.editReport = data;
    this.emitChange();
  }

  handleSingleReportComplete(data) {
    let arr = [];
    this.editReport = data;
    arr.push(data);
    treecycle(data, arr);
    this.singleReport = arr;
    this.emitChange();
  }

  handleSingleReportError(errorMessage) {
    this.error = errorMessage;
    this.emitChange();
  }

  handleAddNewReportSuccess(report) {
    this.isWaiting = false;
    this.emitChange();
  }

  handleMyReports() {
    this.reports = [];
    this.notComplete = [];
    this.newReport = [];
    this.isWaitingGet = true;
    this.emitChange();
  }

  handleMyReportsComplete(data) {
    let j = [];
    this.reports = data;
    for (let i = 0; i < data.length; i++) {
      if (data[i].isCompleted == false) {
        j.push(data[i]);
      }
    }
    this.notComplete = j;
    this.newReport = data[data.length - 1]._id;
    this.isWaitingGet = false;
    this.emitChange();
  }

  handleMyReportsError(errorMessage) {
    this.error = errorMessage;
    this.emitChange();
  }
}

export default alt.createStore(ReportsStore, 'ReportsStore');
