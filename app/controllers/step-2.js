import Ember from 'ember';

var isBlank = Ember.isBlank;

export default Ember.ObjectController.extend({

  isNumberOfEmployeesValid: function () {
    var number = this.get('numberOfEmployees');
    return !isBlank(number) && this.isNumber(number);
  }.property('numberOfEmployees'),

  isSubcontractorsValid: function () {
    var hasSubcontractors = this.get('hasSubcontractors');
    var subcontractorsOnSite = this.get('subcontractorsOnSite');
    if (hasSubcontractors) {
      return !isBlank(subcontractorsOnSite) &&
             this.isNumber(subcontractorsOnSite) &&
             !isBlank(this.get('subcontractorPercentage')) &&
             this.isNumber(this.get('subcontractorPercentage'));
    } else {
      return !isBlank(hasSubcontractors);
    }
  }.property(
    'hasSubcontractors',
    'subcontractorsOnSite',
    'subcontractorPercentage'),

  isValid: function () {
    return this.get('isNumberOfEmployeesValid') &&
           this.get('isSubcontractorsValid');
  }.property(
    'isNumberOfEmployeesValid',
    'isSubcontractorsValid'),

  isNumber: function (number) {
    var regexp = /^\d+$/;
    return isBlank(number) || (''+number).match(regexp);
  }

});
