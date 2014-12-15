import Ember from 'ember';

export default Ember.ObjectController.extend({

  nameError: null,
  emailError: null,

  actions: {
    validateName: function () {
      this.set('nameError', !this.get('isNameValid'));
    },

    validateEmail: function () {
      this.set('emailError', !this.get('isEmailValid'));
    }
  }

});
