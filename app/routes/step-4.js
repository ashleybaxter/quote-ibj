import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    save: function () {
      if (!this.controller.get('isStep4Valid')) {
        alert("Please fill in all fields before continuing");
      } else {
        this.transitionTo('final-quote');
      }
    }
  }

});
