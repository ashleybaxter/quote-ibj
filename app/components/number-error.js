import Ember from 'ember';

var isBlank = Ember.isBlank;

export default Ember.Component.extend({

  number: null,
  regexp: /^\d+$/,

  isNotNumber: function () {
    var number = this.get('number');
    var isNotNumber = !isBlank(number) && !(''+number).match(this.get('regexp'));

    Ember.run.next(this, function() {
      this.$().closest('.form__control').toggleClass('has-error', isNotNumber);
    });

    return isNotNumber;
  }.property('number')

});
