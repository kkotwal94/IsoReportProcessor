import ReportsActions from 'actions/ReportsActions';
import alt from 'altInstance';

class ReportsStore {
constructor() {
    // Instance variables defined anywhere in the store will become the state. You can initialize these in the constructor and
    // then update them directly in the prototype methods
    // (lifecycleMethod: string, handler: function): undefined
    // on: This method can be used to listen to Lifecycle events. Normally they would set up in the constructor
    this.reports = [];
    this.singleReport = [];
    this.notComplete = [];
    this.newReport = [];
    this.isWaiting;
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
        handleRemoveReportSuccess: ReportsActions.REMOVE_REPORT_COMPLETE
    });
  }

  handleAddNewReport() {
    this.isWaiting = true;
    this.emitChange();
  }

  handleSingleReport() {
    this.singleReport = [];
  }

  handleEditReport() {
  }
  
  handleRemoveReport(data) {
   this.emitChange();
  }

  handleRemoveReportSuccess(data) {

  }
  handleEditReportSuccess(data) {
    this.singleReport = data;
    this.emitChange();
  }

  handleSingleReportComplete(data) {
    this.singleReport = data;
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
    this.emitChange();
  }

  handleMyReportsComplete(data) {
    let j = [];
    this.reports = data;
    for (let i = 0; i < data.length; i++) {
      if (data[0].isCompleted == false) {
        j.push(data[i]);
      }
    }
    this.notComplete = j;
    this.newReport = data[data.length - 1]._id;
    this.emitChange();
  }

  handleMyReportsError(errorMessage) {
    this.error = errorMessage;
    this.emitChange();
  }
}

export default alt.createStore(ReportsStore, 'ReportsStore');
