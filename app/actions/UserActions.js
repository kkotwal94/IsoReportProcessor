import alt from 'altInstance';
import UserWebAPIUtils from 'utils/UserWebAPIUtils';

/*
 * Declaring UserActions using ES2015. This is equivalent to creating
 * function UserActions() {}
 * AND
 * UserActions.prototype.create() = function(data) {}
 */
class UserActions {

  handleEmployeeUpdate(data) {
  this.dispatch();
  UserWebAPIUtils.handleEmployee(data)
    .then((response, textStatus) => {
      if (textStatus === 'success') {
        this.actions.handleEmployeeUpdateComplete(data);
      }
    }, () => {
    });
}
  handleEmployeeUpdateComplete(data) {
    this.dispatch(data);
  }

  fetchAllUsers() {
    this.dispatch();
    UserWebAPIUtils.getAllEmployees().done((data) => {
      this.actions.fetchAllUsersComplete(data);
    })
    .fail((errorMessage) => {
      this.actions.fetchAllUsersError(errorMessage);
    });
  }

  fetchAllUsersComplete(users) {
    this.actions.fetchUserProfile();
    this.dispatch(users);
  }

  fetchAllUsersError(errorMessage) {
    this.dispatch(errorMessage);
  }

  fetchUserProfile() {
    this.dispatch();
    UserWebAPIUtils.myProfile().done((data) => {
      this.actions.fetchUserProfileComplete(data);
    })
    .fail((errorMessage) => {
      this.actions.fetchUserProfileError(errorMessage);
    });
  }

fetchUserProfileComplete(profile) {
  this.dispatch(profile);
}

fetchUserProfileError(error) {
  this.dispatch(error);
}

updateMyProfile(data) {
  this.dispatch();
  UserWebAPIUtils.updateMyProfile(data)
    .then((response, textStatus) => {
      if (textStatus === 'success') {
        this.actions.updateProfileSuccess(data);
      }
    }, () => {
    });
}

 updateProfileSuccess(data) {
   this.dispatch(data);
 }
  manuallogin(data) {
    this.dispatch();
    UserWebAPIUtils.manuallogin(data)
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          this.actions.loginsuccess(data.email);
        }
      }, () => {
      });
  }

  loginsuccess(email) {
    this.dispatch(email);
  }

  logout() {
    this.dispatch();
    UserWebAPIUtils.logout()
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          this.actions.logoutsuccess();
        }
      }, () => {
      });
  }

  logoutsuccess() {
    this.dispatch();
  }
}

export default alt.createActions(UserActions);
