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
  
  editReport(data) {
    this.dispatch();
    ReportsWebAPIUtils.editSingleReport(data)
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          this.actions.editReportComplete(data);
        }
      }, () => {

      });
  }
  removeReport(data) {
    this.dispatch();
    ReportsWebAPIUtils.removeSingleReport(data)
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          this.actions.removeReportComplete(data);
        }
      }, () => {

      });
  }

  removeReportComplete(data) {
    this.dispatch(data);
  }
  editReportComplete(data) {
   this.dispatch(data);
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


  getSoloReport(id) {
    this.dispatch();
    ReportsWebAPIUtils.getSingleReport(id).done((data) => {
        this.actions.getSoloReportComplete(data);
      })
      .fail((errorMessage) => {
        this.actions.getSoloReportError(errorMessage);
      });
  }

  getSoloReportComplete(data) {
    this.dispatch(data);
  }

  getSoloReportError(errorMessage) {
    this.dispatch(errorMessage);
  }

}
export default alt.createActions(ReportsActions);
