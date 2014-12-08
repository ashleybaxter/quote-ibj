import Ember from 'ember';

var isBlank = Ember.isBlank;

export default Ember.ObjectController.extend({

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

  isBuildingCoverValid: function () {
    var hasBuildingCover = this.get('hasBuildingCover');
    var rebuildCost = this.get('buildingRebuildCost');
    if (hasBuildingCover) {
      return !isBlank(rebuildCost) && this.isNumber(rebuildCost);
    } else {
      return !isBlank(hasBuildingCover);
    }
  }.property('hasBuildingCover', 'buildingRebuildCost'),

  isEquipmentCoverValid: function () {
    var hasEquipmentCover = this.get('hasEquipmentCover');
    var replacementCost = this.get('equipmentReplacementCost');
    if (hasEquipmentCover) {
      return !isBlank(replacementCost) && this.isNumber(replacementCost);
    } else {
      return !isBlank(hasEquipmentCover);
    }
  }.property('hasEquipmentCover', 'equipmentReplacementCost'),

  isValid: function () {
    return this.get('isPublicLiabilityValid') &&
           this.get('isEmployersLiabilityValid') &&
           this.get('isProfessionalIndemnityValid') &&
           !isBlank(this.get('hasLegalExpenseCover')) &&
           this.get('isBuildingCoverValid') &&
           this.get('isEquipmentCoverValid');
  }.property(
    'isPublicLiabilityValid',
    'isEmployersLiabilityValid',
    'isProfessionalIndemnityValid',
    'hasLegalExpenseCover',
    'isBuildingCoverValid',
    'isEquipmentCoverValid'),

  isNumber: function (number) {
    var regexp = /^\d+$/;
    return isBlank(number) || (''+number).match(regexp);
  }

});
