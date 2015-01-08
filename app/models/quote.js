import Ember from 'ember';

var isBlank = Ember.isBlank;

var isNumber = function (number) {
  var regexp = /^\d+$/;
  return isBlank(number) || (''+number).match(regexp);
};

export default Ember.Object.extend({

  facebookConnected: false,
  title: null,
  name: null,
  email: null,
  phoneNumber: null,
  alternativePhoneNumber: null,
  occupation: null,
  otherOccupation: null,
  experience: null,
  businessType: null,
  publicLiability: null,
  numberOfEmployees: null,
  employersLiability: null,
  professionalIndemnity: null,
  businessPostcode: null,
  turnover: null,
  hasSecondTrade: null,
  secondTrade: null,
  hasSubcontractors: null,
  subcontractorsOnSite: null,
  subcontractorPercentage: null,
  hasLegalExpenseCover: null,
  hasBuildingCover: null,
  buildingRebuildCost: null,
  hasEquipmentCover: null,
  equipmentReplacementCost: null,

  hasWorkOutsideUK: null,
  percentageOfContractsInUK: null,
  percentageOfContractsInEU: null,
  percentageOfContactsInUS: null,
  percentageOfContractsInROW: null,

  hasSpecificServiceLocations: null,
  usesHeatProducingEquipment: null,
  hasMoreThanTenYearsAtLocations: null,
  numberOfYearsAtLocations: null,

  hasSignificantLossPossibility: null,



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

  legalExpensesQuote: function () {
    if (this.get('hasLegalExpenseCover')) {
      return 0;
    } else {
      return 0;
    }
  }.property('hasLegalExpenseCover'),

  buildingCoverQuote: function () {
    var rebuildCost = this.get('buildingRebuildCost');
    if (rebuildCost) {
      return 1.0 * (rebuildCost / 1000);
    } else {
      return 0;
    }
  }.property('buildingRebuildCost'),

  equipmentCoverQuote: function () {
    var replacementCost = this.get('equipmentReplacementCost');
    if (replacementCost) {
      return 1.0 * (replacementCost / 1000);
    } else {
      return 0;
    }
  }.property('equipmentReplacementCost'),

  quoteTotal: function () {
    return this.get('publicLiabilityQuote') +
           this.get('employersLiabilityQuote') +
           this.get('professionalIndemnityQuote') +
           this.get('legalExpensesQuote') +
           this.get('buildingCoverQuote') +
           this.get('equipmentCoverQuote');
  }.property(
    'publicLiabilityQuote',
    'employersLiabilityQuote',
    'professionalIndemnityQuote',
    'legalExpensesQuote',
    'buildingCoverQuote',
    'equipmentCoverQuote'),

  // Validation

  isNameValid: function () {
    var name = (''+this.get('name')).trim();
    return !isBlank(name) && name.split(' ').length >= 2;
  }.property('name'),

  isEmailValid: function () {
    var email = (''+this.get('email')).trim();
    var emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return !isBlank(email) && (email.match(emailRegex) != null);
  }.property('email'),

  isOccupationValid: function () {
    var occupation = this.get('occupation');
    var otherOccupation = this.get('otherOccupation');
    if (occupation === 'other') {
      return !isBlank(otherOccupation);
    } else {
      return !isBlank(occupation);
    }
  }.property('occupation', 'otherOccupation'),

  isPublicLiabilityValid: function () {
    var number = this.get('publicLiability');
    return !isBlank(number) && isNumber(number);
  }.property('publicLiability'),

  isEmployersLiabilityValid: function () {
    var number = this.get('employersLiability');
    return !isBlank(number) && isNumber(number);
  }.property('employersLiability'),

  isProfessionalIndemnityValid: function () {
    var number = this.get('professionalIndemnity');
    return !isBlank(number) && isNumber(number);
  }.property('professionalIndemnity'),

  isNumberOfEmployeesValid: function () {
    var number = this.get('numberOfEmployees');
    return !isBlank(number) && isNumber(number);
  }.property('numberOfEmployees'),

  isSecondTradeValid: function () {
    var hasSecondTrade = this.get('hasSecondTrade');
    var secondTrade = this.get('secondTrade');
    if (hasSecondTrade) {
      return !isBlank(secondTrade);
    } else {
      return !isBlank(hasSecondTrade);
    }
  },

  isTurnoverValid: function () {
    var number = this.get('turnover');
    return !isBlank(number) && isNumber(number);
  }.property('turnover'),

  isSubcontractorsValid: function () {
    var hasSubcontractors = this.get('hasSubcontractors');
    var subcontractorsOnSite = this.get('subcontractorsOnSite');
    if (hasSubcontractors) {
      return !isBlank(subcontractorsOnSite) &&
          isNumber(subcontractorsOnSite) &&
          !isBlank(this.get('subcontractorPercentage')) &&
          isNumber(this.get('subcontractorPercentage'));
    } else {
      return !isBlank(hasSubcontractors);
    }
  }.property(
    'hasSubcontractors',
    'subcontractorsOnSite',
    'subcontractorPercentage'),

  isBuildingCoverValid: function () {
    var hasBuildingCover = this.get('hasBuildingCover');
    var rebuildCost = this.get('buildingRebuildCost');
    if (hasBuildingCover) {
      return !isBlank(rebuildCost) && isNumber(rebuildCost);
    } else {
      return !isBlank(hasBuildingCover);
    }
  }.property('hasBuildingCover', 'buildingRebuildCost'),

  isEquipmentCoverValid: function () {
    var hasEquipmentCover = this.get('hasEquipmentCover');
    var replacementCost = this.get('equipmentReplacementCost');
    if (hasEquipmentCover) {
      return !isBlank(replacementCost) && isNumber(replacementCost);
    } else {
      return !isBlank(hasEquipmentCover);
    }
  }.property('hasEquipmentCover', 'equipmentReplacementCost'),


  isEstimateValid: function () {
    return this.get('isOccupationValid') &&
        !isBlank(this.get('experience')) &&
        !isBlank(this.get('businessType')) &&
        this.get('isPublicLiabilityValid') &&
        this.get('isEmployersLiabilityValid') &&
        this.get('isProfessionalIndemnityValid') &&
        this.get('isNumberOfEmployeesValid') &&
        !isBlank(this.get('hasLegalExpenseCover')) &&
        this.get('isBuildingCoverValid') &&
        this.get('isEquipmentCoverValid');
  }.property(
    'isOccupationValid',
    'experience',
    'businessType',
    'isPublicLiabilityValid',
    'isEmployersLiabilityValid',
    'isProfessionalIndemnityValid',
    'isNumberOfEmployeesValid',
    'hasLegalExpenseCover',
    'isBuildingCoverValid',
    'isEquipmentCoverValid'),

  isStep1Valid: function () {
    this.get('occupation');

    return this.get('isOccupationValid') &&
        this.get('isSecondTradeValid') &&
        !isBlank(this.get('businessType')) &&
        !isBlank(this.get('experience')) &&
        !isBlank(this.get('businessPostcode')) &&
        this.get('isTurnoverValid');
  }.property(
    'isOccupationValid',
    'isSecondTradeValid',
    'businessType',
    'experience',
    'businessPostcode',
    'isTurnoverValid'),

  isStep2Valid: function () {
    return this.get('isNumberOfEmployeesValid') &&
        this.get('isSubcontractorsValid');
  }.property(
    'isNumberOfEmployeesValid',
    'isSubcontractorsValid'),

  isStep3Valid: function () {
    return !isBlank(this.get('title')) &&
        this.get('isNameValid') &&
        this.get('isEmailValid') &&
        !isBlank(this.get('phoneNumber'));
  }.property(
    'title',
    'isNameValid',
    'isEmailValid',
    'phoneNumber'),

  isStep4Valid: function () {
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

});
