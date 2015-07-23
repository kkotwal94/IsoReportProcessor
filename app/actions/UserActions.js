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
    this.actions.fetchUserProfile();
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

  buttonAction() {
    this.dispatch();
    UserWebAPIUtils.getAllEmployees().done((allUsers) => {
      UserWebAPIUtils.myProfile().done((myProfile) => {
        let data = {'allUsers': allUsers, 'myProfile': myProfile};
        this.actions.fetchButtonAction(data);
      })
       .fail((errorMessage) => {
         this.actions.buttonActionError(errorMessage);
       });
    })
    .fail((errorMessage) => {
      this.actions.buttonActionError(errorMessage);
    });
  }

  fetchButtonAction(data) {
    this.dispatch(data);
  }

  buttonActionError(errorMessage) {
    this.dispatch(errorMessage);
  }

  fetchMyLackeys() {
    this.dispatch();
    UserWebAPIUtils.getMyEmployees().done((myUsers) => {
      UserWebAPIUtils.myProfile().done((myProfile) => {
        let data = {'myUsers': myUsers, 'myProfile': myProfile};
        this.actions.fetchMyLackeysSuccess(data);
      })
       .fail((errorMessage) => {
         this.actions.fetchMyLackeysError(errorMessage);
       });
    })
    .fail((errorMessage) => {
      this.actions.fetchMyLackeysError(errorMessage);
    });
  }

  fetchMyLackeysSuccess(data) {
    this.dispatch(data);
  }

  fetchMyLackeysError(errorMessage) {
    this.dispatch(errorMessage);
  }
}

export default alt.createActions(UserActions);
