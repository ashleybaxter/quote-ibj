import Ember from 'ember';

export default Ember.Object.extend({

  occupation: null,
  otherOccupation: null,
  experience: null,
  businessType: null,
  publicLiability: null,
  numberOfEmployees: null,
  employersLiability: null,
  professionalIndemnity: null,


  publicLiabilityQuote: function () {
    var publicLiability = parseInt(this.get('publicLiability'));
    return 1.3 * (publicLiability / 1000);
  }.property('publicLiability'),

  employersLiabilityQuote: function () {
    var employersLiability = parseInt(this.get('employersLiability'));
    var numberOfEmployees = parseInt(this.get('numberOfEmployees'));
    return 1.0 * (employersLiability / 1000) * numberOfEmployees;
  }.property('employersLiability', 'numberOfEmployees'),

  professionalIndemnityQuote: function () {
    var professionalIndemnity = parseInt(this.get('professionalIndemnity'));
    return 1.8 * (professionalIndemnity / 1000);
  }.property('professionalIndemnity'),

  quoteTotal: function () {
    return this.get('publicLiabilityQuote') +
           this.get('employersLiabilityQuote') +
           this.get('professionalIndemnityQuote');
  }.property(
    'publicLiabilityQuote',
    'employersLiabilityQuote',
    'professionalIndemnityQuote')

});
