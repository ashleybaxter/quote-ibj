import Ember from 'ember';

var isBlank = Ember.isBlank;

export function initialize() {
  // application.inject('route', 'foo', 'service:foo');
  Ember.TextField.reopen({

    isValid: null,

    toggleActive: function () {
      if (isBlank(this.get('value'))) {
        this.$().removeClass('active');
        this.$().closest('.form__control').removeClass('active');
      } else {
        if (this.get('isValid') != null) {
          var isValid = this.get('isValid');
          this.$().toggleClass('active', isValid);
          this.$().closest('.form__control').toggleClass('active', isValid);
        } else {
          this.$().addClass('active');
          this.$().closest('.form__control').addClass('active');
        }
      }
    }.observes('value'),

    toggleActiveForInitialValue: function () {
      this.toggleActive();
    }.on('didInsertElement'),

    focusIn: function (event) {
      this.toggleActive();
      this._super(event);
    },

    focusOut: function (event) {
      this.toggleActive();
      this._super(event);
    }

  });
}

export default {
  name: 'text-field',
  initialize: initialize
};
