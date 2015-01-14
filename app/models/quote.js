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
  employeeWagesPaid: null,
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

  ccNumber: null,
  ccExpiry: null,
  ccCSV: null,


  requiresEmployersLiability: function () {
    return this.get('businessType') !== 'sole trader';
  }.property('businessType'),

  hasEmployersLiability: function () {
    var liability = this.get('employersLiability');
    return this.get('requiresEmployersLiability') &&
        !Ember.isBlank(liability) && liability > 0;
  }.property('requiresEmployersLiability', 'employersLiability'),


  publicLiabilityQuote: function () {
    var publicLiability = parseInt(this.get('publicLiability'));
    return 1.3 * (publicLiability / 1000);
  }.property('publicLiability'),

  employersLiabilityQuote: function () {
    if (this.get('requiresEmployersLiability')) {
      var employersLiability = parseInt(this.get('employersLiability'));
      var numberOfEmployees = parseInt(this.get('numberOfEmployees'));
      return 1.0 * (employersLiability / 1000) * numberOfEmployees;
    } else {
      return 0;
    }
  }.property('employersLiability', 'numberOfEmployees', 'requiresEmployersLiability'),

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
    var total;
    total = this.get('publicLiabilityQuote') +
            this.get('employersLiabilityQuote') +
            this.get('professionalIndemnityQuote') +
            this.get('legalExpensesQuote') +
            this.get('buildingCoverQuote') +
            this.get('equipmentCoverQuote');

    if (isNaN(total)) {
      return 0;
    } else {
      return total;
    }
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

  isEmployeeWagesPaidValid: function () {
    var number = this.get('employeeWagesPaid');
    return !isBlank(number) && isNumber(number);
  }.property('employeeWagesPaid'),

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
    var isEmployersLiabilityValid;

    if (this.get('requiresEmployersLiability')) {
      isEmployersLiabilityValid = this.get('isEmployeeWagesPaidValid') &&
          this.get('isEmployersLiabilityValid') &&
          this.get('isNumberOfEmployeesValid');
    } else {
      isEmployersLiabilityValid = true;
    }

    return this.get('isOccupationValid') &&
        !isBlank(this.get('experience')) &&
        !isBlank(this.get('businessType')) &&
        this.get('isPublicLiabilityValid') &&
        isEmployersLiabilityValid &&
        this.get('isProfessionalIndemnityValid') &&
        !isBlank(this.get('hasLegalExpenseCover')) &&
        this.get('isBuildingCoverValid') &&
        this.get('isEquipmentCoverValid');
  }.property(
    'isOccupationValid',
    'experience',
    'businessType',
    'isPublicLiabilityValid',
    'requiresEmployersLiability',
    'isEmployersLiabilityValid',
    'isEmployeeWagesPaidValid',
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
    var isEmployersLiabilityValid;

    if (this.get('requiresEmployersLiability')) {
      isEmployersLiabilityValid = this.get('isEmployeeWagesPaidValid') &&
          this.get('isEmployersLiabilityValid');
    } else {
      isEmployersLiabilityValid = true;
    }

    return this.get('isPublicLiabilityValid') &&
        isEmployersLiabilityValid &&
        this.get('isProfessionalIndemnityValid') &&
        !isBlank(this.get('hasLegalExpenseCover')) &&
        this.get('isBuildingCoverValid') &&
        this.get('isEquipmentCoverValid');
  }.property(
    'requiresEmployersLiability',
    'isPublicLiabilityValid',
    'isEmployersLiabilityValid',
    'isEmployeeWagesPaidValid',
    'isProfessionalIndemnityValid',
    'hasLegalExpenseCover',
    'isBuildingCoverValid',
    'isEquipmentCoverValid'),

  isPaymentValid: function () {
    return !isBlank(this.get('ccNumber')) &&
        !isBlank(this.get('ccExpiry')) &&
        !isBlank(this.get('ccCSV'));
  }.property(
    'ccNumber',
    'ccExpiry',
    'ccCSV'
  )

});
