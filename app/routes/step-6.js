import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    save: function () {
      this.transitionTo('step-7');
    }
  }
});
