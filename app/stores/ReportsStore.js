import ReportsActions from 'actions/ReportsActions';
import alt from 'altInstance';

class ReportsStore {
constructor() {
    // Instance variables defined anywhere in the store will become the state. You can initialize these in the constructor and
    // then update them directly in the prototype methods
    // (lifecycleMethod: string, handler: function): undefined
    // on: This method can be used to listen to Lifecycle events. Normally they would set up in the constructor
    this.reports = [];
    // (listenersMap: object): undefined
    // bindListeners accepts an object where the keys correspond to the method in your
    // StoreModel and the values can either be an array of action symbols or a single action symbol.
    // Remember: alt generates uppercase constants for us to reference
    this.bindListeners({
        handleAddNewReport: ReportsActions.ADD_NEW_REPORT,
        handleAddNewReportSuccess: ReportsActions.ADD_NEW_REPORT_COMPLETE,
        handleMyReports: ReportsActions.GET_MY_REPORTS,
        handleMyReportsComplete: ReportsActions.GET_MY_REPORTS_COMPLETE,
        handleMyReportsError: ReportsActions.GET_MY_REPORTS_ERROR
    });
  }

  handleAddNewReport() {

  }

  handleAddNewReportSuccess(report) {
    this.reports.push(report);
    this.emitChange();
  }

  handleMyReports() {
    this.reports = [];
  }

  handleMyReportsComplete(data) {
    this.reports = data;
  }

  handleMyReportsError(errorMessage) {
    this.error = errorMessage;
  }
}

export default alt.createStore(ReportsStore, 'ReportsStore');
