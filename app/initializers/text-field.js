import Ember from 'ember';

export function initialize() {
  // application.inject('route', 'foo', 'service:foo');
  Ember.TextField.reopen({

    focusIn: function () {
      this.$().addClass('active');
      this.$().closest('.form__control').addClass('active');
    },
    focusOut: function () {
      this.$().removeClass('active');
      this.$().closest('.form__control').removeClass('active');
    }

  });
};

export default {
  name: 'text-field',
  initialize: initialize
};
