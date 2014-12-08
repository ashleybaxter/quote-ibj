import Ember from 'ember';

var isBlank = Ember.isBlank;

export function initialize() {
  // application.inject('route', 'foo', 'service:foo');
  Ember.TextField.reopen({

    toggleActive: function () {
      if (isBlank(this.get('value'))) {
        this.$().removeClass('active');
        this.$().closest('.form__control').removeClass('active');
      } else {
        this.$().addClass('active');
        this.$().closest('.form__control').addClass('active');
      }
    }.observes('value'),

    toggleActiveForInitialValue: function () {
      this.toggleActive();
    }.on('didInsertElement'),

    focusIn: function () {
      this.toggleActive();
    },

    focusOut: function () {
      this.toggleActive();
    }

  });
}

export default {
  name: 'text-field',
  initialize: initialize
};
