import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('estimate');
  this.route('step-1');
  this.route('step-2');
  this.route('step-3');
  this.route('step-4');
  this.route('step-5');
  this.route('step-6');
  this.route('step-7');
  this.route('final-quote');
});

export default Router;
