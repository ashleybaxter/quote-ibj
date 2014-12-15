import Ember from 'ember';

export default Ember.Route.extend({

  title: "Get a Quote",

  actions: {
    save: function () {
      if (!this.controller.get('model.isEstimateValid')) {
        alert("Please fill in all fields before continuing");
      } else {
        this.transitionTo('estimate');
      }
    }
  }

});
