import Ember from 'ember';

var isBlank = Ember.isBlank;

export default Ember.ObjectController.extend({

  actions: {
    validateName: function () {
      this.set('nameError', !this.get('isNameValid'));
    },

    validateEmail: function () {
      this.set('emailError', !this.get('isEmailValid'));
    }
  },

  isNameValid: function () {
    var name = (''+this.get('name')).trim();
    return !isBlank(name) && name.split(' ').length >= 2;
  }.property('name'),

  isEmailValid: function () {
    var email = (''+this.get('email')).trim();
    var emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return !isBlank(email) && email.match(emailRegex);
  }.property('email'),

  isValid: function () {
    return !isBlank(this.get('title')) &&
           this.get('isNameValid') &&
           this.get('isEmailValid') &&
           !isBlank(this.get('phoneNumber'));
  }.property(
    'title',
    'isNameValid',
    'isEmailValid',
    'phoneNumber'),

});
