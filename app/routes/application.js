import Ember from 'ember';
import Quote from '../models/quote';

export default Ember.Route.extend({
  model: function () {
    return Quote.create();
  }
});
