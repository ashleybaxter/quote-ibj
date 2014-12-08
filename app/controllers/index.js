import Ember from 'ember';

var isBlank = Ember.isBlank;

export default Ember.ObjectController.extend({

  isOccupationValid: function () {
    var occupation = this.get('occupation');
    var otherOccupation = this.get('otherOccupation');
    if (isBlank(occupation)) {
      return false;
    } else {
      return !isBlank(otherOccupation);
    }
  }.property('occupation', 'otherOccupation'),

  isPublicLiabilityValid: function () {
    var number = this.get('publicLiability');
    return !isBlank(number) && this.isNumber(number);
  }.property('publicLiability'),

  isEmployersLiabilityValid: function () {
    var number = this.get('employersLiability');
    return !isBlank(number) && this.isNumber(number);
  }.property('employersLiability'),

  isProfessionalIndemnityValid: function () {
    var number = this.get('professionalIndemnity');
    return !isBlank(number) && this.isNumber(number);
  }.property('professionalIndemnity'),

  isNumberOfEmployeesValid: function () {
    var number = this.get('numberOfEmployees');
    return !isBlank(number) && this.isNumber(number);
  }.property('numberOfEmployees'),

  isValid: function () {
    return this.get('isOccupationValid') &&
           !isBlank(this.get('experience')) &&
           !isBlank(this.get('businessType')) &&
           this.get('isPublicLiabilityValid') &&
           this.get('isEmployersLiabilityValid') &&
           this.get('isProfessionalIndemnityValid') &&
           this.get('isNumberOfEmployeesValid');
  }.property(
    'isOccupationValid',
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
