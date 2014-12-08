import Ember from 'ember';

export default Ember.Route.extend({

  title: "Your Quote",

  actions: {
    facebookConnect: function () {
      var model = this.get('controller.model');
      model.set('name', 'Walter Gutierrez');
      model.set('email', 'walter.gutierrez56@example.com');
      model.set('phoneNumber', '(327)-269-1797');
      model.set('facebookConnected', true);
    }
  }

});
