import Ember from 'ember';

export function formatCurrency(number) {
  var options = { style: 'currency', currency: 'GBP' };
  number = Math.round(number);
  var currency = new Intl.NumberFormat('en-GB', options).format(number);
  return currency;
}

export default Ember.Handlebars.makeBoundHelper(formatCurrency);
