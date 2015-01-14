import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    save: function () {
      if (!this.controller.get('isStep1Valid')) {
        alert("Please fill in all fields before continuing");
      } else {
        if (this.controller.get('requiresEmployersLiability')) {
          this.transitionTo('step-2');
        } else {
          this.transitionTo('step-3');
        }
      }
    }
  }
});
