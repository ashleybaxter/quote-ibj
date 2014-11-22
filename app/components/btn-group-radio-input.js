import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'input',
  type: 'radio',
  attributeBindings: ['checked', 'name', 'type', 'value', 'class'],

  classNames: ['btn', 'clearfix'],

  click: function() {
    if (this.get('checked')) {
      this.set('groupValue', null);
    } else {
      this.set('groupValue', this.get('value'));
    }
    Ember.run.once(this, function() { this.$().trigger('change'); });
    return false;
  },

  checked: function () {
    if (this.get('value') === this.get('groupValue')) {
      Ember.run.once(this, 'takeAction');
      return true;
    } else {
      return false;
    }
  }.property('value', 'groupValue'),

  takeAction: function () {
    this.sendAction('selectedAction', this.get('value'));
  },

  labelClassNames: function () {
    return this.classNames.join(' ');
  }.property(),

  change: function () {
    var active = !Ember.isBlank(this.get('groupValue'));
    this.$().closest('.form__control').toggleClass('active', active);
    Ember.run.once(this, 'checked'); // manual observer
  }

});
