import Ember from 'ember';

var isBlank = Ember.isBlank;

export default Ember.ObjectController.extend({

  isOccupationValid: function () {
    var occupation = this.get('occupation');
    var otherOccupation = this.get('otherOccupation');
    if (isBlank(occupation)) {
      return false;
    } else {
      return !isBlank(otherOccupation);
    }
  }.property('occupation', 'otherOccupation'),

  isSecondTradeValid: function () {
    var hasSecondTrade = this.get('hasSecondTrade');
    var secondTrade = this.get('secondTrade');
    if (hasSecondTrade) {
      return !isBlank(secondTrade);
    } else {
      return false;
    }
  },

  isTurnoverValid: function () {
    var number = this.get('turnover');
    return !isBlank(number) && this.isNumber(number);
  }.property('turnover'),

  isValid: function () {
    return this.get('isOccupationValid') &&
           this.get('isSecondTradeValid') &&
           !isBlank(this.get('businessType')) &&
           !isBlank(this.get('experience')) &&
           !isBlank(this.get('businessPostcode')) &&
           this.get('isTurnoverValid');
  }.property(
    'isOccupationValid',
    'isSecondTradeValid',
    'businessType',
    'experience',
    'businessPostcode',
    'isTurnoverValid'),

  isNumber: function (number) {
    var regexp = /^\d+$/;
    return isBlank(number) || (''+number).match(regexp);
  }

});
