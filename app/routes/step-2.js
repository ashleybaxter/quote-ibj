import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    save: function () {
      if (!this.controller.get('isStep2Valid')) {
        alert("Please fill in all fields before continuing");
      } else {
        this.transitionTo('step-3');
      }
    }
  }
});
