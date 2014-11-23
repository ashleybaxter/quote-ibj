import Ember from 'ember';

var isBlank = Ember.isBlank;

export default Ember.ObjectController.extend({

  isValid: function () {
    var isValid = !isBlank(this.get('occupation')) &&
                  !isBlank(this.get('experience')) &&
                  !isBlank(this.get('occupation')) &&
                  !isBlank(this.get('sumInsured'));

    return isValid;
  }.property('occupation', 'experience', 'businessType', 'sumInsured')

});
