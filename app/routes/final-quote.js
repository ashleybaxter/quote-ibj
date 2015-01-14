import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    pay: function () {
      if (!this.controller.get('isPaymentValid')) {
        alert("Please fill in all fields before continuing");
      } else {
        alert("Payent received, Thank You");
      }
    }
  }
});
