import Ember from 'ember';

var isBlank = Ember.isBlank;

export default Ember.ObjectController.extend({

  isPublicLiabilityValid: function () {
    return this.isNumber(this.get('publicLiability'));
  }.property('publicLiability'),

  isEmployersLiabilityValid: function () {
    return this.isNumber(this.get('employersLiability'));
  }.property('employersLiability'),

  isProfessionalIndemnityValid: function () {
    return this.isNumber(this.get('professionalIndemnity'));
  }.property('professionalIndemnity'),

  isNumberOfEmployeesValid: function () {
    return this.isNumber(this.get('numberOfEmployees'));
  }.property('numberOfEmployees'),

  isValid: function () {
    var occupation = this.get('occupation');

    return !isBlank(occupation) &&
           // validate otherOccupation is present if occupation == 'other'
           !isBlank(this.get('experience')) &&
           !isBlank(this.get('businessType')) &&
           this.get('isPublicLiabilityValid') &&
           this.get('isEmployersLiabilityValid') &&
           this.get('isProfessionalIndemnityValid') &&
           this.get('isNumberOfEmployeesValid');
  }.property(
    'occupation',
    'otherOccupation',
    'experience',
    'businessType',
    'isPublicLiabilityValid',
    'isEmployersLiabilityValid',
    'isProfessionalIndemnityValid',
    'isNumberOfEmployeesValid'),

  isNumber: function (number) {
    var regexp = /^\d+$/;

    return isBlank(number) || (''+number).match(regexp);
  }

});
