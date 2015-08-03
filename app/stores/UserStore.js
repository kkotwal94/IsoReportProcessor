import Immutable from 'immutable';
import UserActions from 'actions/UserActions';
import alt from 'altInstance';

/**
 * Flux Explanation of Store:
 * Stores contain the application state and logic. Their role is somewhat similar to a model in a traditional MVC, but
 * they manage the state of many objects. Nor are they the same as Backbone's collections. More than simply managing a
 * collection of ORM-style objects, stores manage the application state for a particular domain within the application.
 *
 * A store registers itself with the dispatcher and provides it with a callback. This callback receives a data payload
 * as a parameter. The payload contains an action with an attribute identifying the action's type. Within the store's
 * registered callback, a switch statement based on the action's type is used to interpret the payload and to provide the
 * proper hooks into the store's internal methods. This allows an action to result in an update to the state of the store,
 * via the dispatcher. After all the stores are updated, they broadcast an event declaring that their state has changed,
 * so the views may query the new state and update themselves.
 *
 * Alt Implementation of Stores:
 * These are the stores returned by alt.createStore, they will not have the methods defined in your StoreModel because flux
 * stores do not have direct setters. However, any static methods defined in your StoreModel will be transferred to this object.
 *
 * Please note: Static methods defined on a store model are nothing more than synthetic sugar for exporting the method as a public
 * method of your alt instance. This means that `this` will be bound to the store instance. It is recommended to explicitly export
 * the methods in the constructor using StoreModel#exportPublicMethods.
 *
 */
class UserStore {

  /*
   * The constructor of your store definition receives the alt instance as its first and only argument. All instance variables,
   * values assigned to `this`, in any part of the StoreModel will become part of state.
   */
  constructor() {
    // Instance variables defined anywhere in the store will become the state. You can initialize these in the constructor and
    // then update them directly in the prototype methods
    this.user = Immutable.Map({});
    this.userProfile = [];
    this.allUsers = [];
    this.lackeys = [];
    this.myLackeys = [];
    this.selectedData = [];
    this.uid = [];
    // (lifecycleMethod: string, handler: function): undefined
    // on: This method can be used to listen to Lifecycle events. Normally they would set up in the constructor
    this.on('init', this.bootstrap);
    this.on('bootstrap', this.bootstrap);

    // (listenersMap: object): undefined
    // bindListeners accepts an object where the keys correspond to the method in your
    // StoreModel and the values can either be an array of action symbols or a single action symbol.
    // Remember: alt generates uppercase constants for us to reference
    this.bindListeners({
      handleLoginAttempt: UserActions.MANUALLOGIN,
      handleLoginSuccess: UserActions.LOGINSUCCESS,
      handleLogoutAttempt: UserActions.LOGOUT,
      handleLogoutSuccess: UserActions.LOGOUTSUCCESS,
      handleFetchUserProfile: UserActions.FETCH_USER_PROFILE,
      handleFetchUserProfileComplete: UserActions.FETCH_USER_PROFILE_COMPLETE,
      handleFetchUserProfileError: UserActions.FETCH_USER_PROFILE_ERROR,
      handleUpdateSuccess: UserActions.UPDATE_PROFILE_SUCCESS,
      handleFetchAllUsers: UserActions.FETCH_ALL_USERS,
      handleFetchAllUsersComplete: UserActions.FETCH_ALL_USERS_COMPLETE,
      handleFetchAllUsersError: UserActions.FETCH_ALL_USERS_ERROR,
      handleEmployeeUpdateComplete: UserActions.HANDLE_EMPLOYEE_UPDATE_COMPLETE,
      handleButtonAction: UserActions.BUTTON_ACTION,
      handleButtonActionSuccess: UserActions.FETCH_BUTTON_ACTION,
      handleButtonError: UserActions.BUTTON_ACTION_ERROR,
      handleSelected: UserActions.GET_SELECTED
    });
  }

  bootstrap() {
    if (!Immutable.Map.isMap(this.user)) {
      this.user = Immutable.fromJS(this.user);
    }
  }
  handleMyLackeys() {
    this.myLackeys = [];
    this.emitChange();
  }

  handleSelected(data) {
    this.selectedData = data;
    this.emitChange();
  }

  handleMyLackeysSuccess(data) {

  }

  handleMyLackeysError(errorMessage) {
    this.error = errorMessage;
  }
  handleButtonAction() {
    this.userProfile = [];
    this.lackeys = [];
    this.emitChange();
    this.myLackeys = [];
    this.uid = [];
  }

  handleButtonError(errorMessage) {
    this.error = errorMessage;
  }

  handleButtonActionSuccess(data) {
    let sample = [];
    for (let i = 0; i < data.allUsers.length; i++) {
      data.allUsers[i].isOwned = false;
      data.allUsers[i].buttonText = 'Assign me as a employee';
      data.allUsers[i].buttonClass = 'btn btn-primary';
      for (let x = 0; x < data.myProfile.lackeys.length; x++) {
        if (data.allUsers[i]._id == data.myProfile.lackeys[x]) {
          sample.push(data.allUsers[i]);
          data.allUsers[i].isOwned = true;
          data.allUsers[i].buttonText = 'Remove me as a employee';
          data.allUsers[i].buttonClass = 'btn btn-danger';
        }
      }
    }
    this.myLackeys = sample;
    this.allUsers = data.allUsers;
    this.userProfile = data.myProfile;
    this.uid = data._id;
    this.emitChange();
  }

  handleEmployeeUpdateComplete(data) {
    let uid = data.data;
    for (let i = 0; i < this.allUsers.length; i++) {
      if (uid == this.allUsers[i]._id) {
        if (this.allUsers[i].isOwned == false || this.allUsers[i].isOwned == null) {
          this.allUsers[i].isOwned = true;
          this.allUsers[i].buttonText = 'Remove me as a employee';
          this.allUsers[i].buttonClass = 'btn btn-danger';
        } else {
          this.allUsers[i].isOwned = false;
          this.allUsers[i].buttonText = 'Assign me as a employee';
          this.allUsers[i].buttonClass = 'btn btn-primary';
        }
      }
    }
    this.emitChange();
  }

  handleEmployeeUpdateError(error) {
    this.error = error;
  }
  handleFetchUserProfile() {
    this.userProfile = [];
    this.lackeys = [];
    this.emitChange();
  }

  handleFetchUserProfileComplete(profile) {
    this.userProfile = profile;
    this.lackeys = profile.lackeys;
    this.emitChange();
  }

  handleFetchUserProfileError(error) {
    this.error = error;
    this.emitChange();
  }

  handleFetchAllUsers() {
    this.allUsers = [];
    this.emitChange();
  }

  handleFetchAllUsersComplete(users) {
    for (let i = 0; i < users.length; i++) {
      users[i].isOwned = false;
      users[i].buttonText = 'Assign me as a employee';
      users[i].buttonClass = 'btn btn-primary';
    }
    this.allUsers = users;
    this.emitChange();
  }

  handleFetchAllUsersError(error) {
    this.error = error;
  }

  handleLoginAttempt() {
    this.user = this.user.set('isWaiting', true);
    this.emitChange();
  }
  handleUpdateSuccess(data) {
    if (data.firstName === '') {
      data.firstName = this.userProfile.profile.firstName;
    }
    if (data.lastName === '') {
      data.lastName = this.userProfile.profile.lastName;
    }
    if (data.dob === '') {
      data.dob = this.userProfile.profile.dob;
    }
    if (data.department === '') {
      data.department = this.userProfile.profile.department;
    }
    if (data.position === '') {
      data.position = this.userProfile.profile.position;
    }
    this.userProfile.profile = data;
  }
  handleLoginSuccess() {
    this.user = this.user.merge({ isWaiting: false, authenticated: true });
    this.emitChange();
  }

  handleLogoutAttempt() {
    this.user = this.user.set('isWaiting', true);
    this.emitChange();
  }

  handleLogoutSuccess() {
    this.user = this.user.merge({ isWaiting: false, authenticated: false });
    this.emitChange();
  }

}

// Export our newly created Store
export default alt.createStore(UserStore, 'UserStore');
