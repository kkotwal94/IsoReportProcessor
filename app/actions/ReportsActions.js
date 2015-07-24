import alt from 'altInstance';
import ReportsWebAPIUtils from 'utils/ReportsWebAPIUtils';

class ReportsActions {

  addNewReport(data) {
  this.dispatch();
  ReportsWebAPIUtils.addNewReport(data)
    .then((response, textStatus) => {
      if (textStatus === 'success') {
        this.actions.addNewReportComplete(data);
      }
    }, () => {
    });
}

  addNewReportComplete(report) {
    this.dispatch(report);
  }

  getMyReports() {
    this.dispatch();
    ReportsWebAPIUtils.getAllReports().done((data) => {
      this.actions.getMyReportsComplete(data);
    })
    .fail((errorMessage) => {
      this.actions.getMyReportsError(errorMessage);
    });
  }

  getMyReportsComplete(data) {
    this.dispatch(data);
  }

  getMyReportsError(errorMessage) {
    this.dispatch(errorMessage);
  }
}

export default alt.createActions(ReportsActions);
