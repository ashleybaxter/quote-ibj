import Ember from 'ember';

var isBlank = Ember.isBlank;

export default Ember.ObjectController.extend({

  actions: {
    save: function () {
      if (!this.get('isValid')) {
        alert("Please fill in all fields before continuing");
      }
    }
  },

  isValid: function () {
    var isValid = !isBlank(this.get('occupation')) &&
                  !isBlank(this.get('experience')) &&
                  !isBlank(this.get('occupation')) &&
                  !isBlank(this.get('sumInsured'));

    return isValid;
  }.property('occupation', 'experience', 'businessType', 'sumInsured')

});
