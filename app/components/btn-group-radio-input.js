import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'input',
  type: 'radio',
  attributeBindings: ['checked', 'name', 'type', 'value', 'class'],

  classNames: ['btn', 'clearfix'],

  deferClick: false,

  click: function () {
    if (!this.get('deferClick')) {
      if (this.$().prop('checked')) {
        this.set('groupValue', null);
        this.$().prop('checked', false);
      }
    }
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

    if (this.$().prop('checked')) {
      this.set('groupValue', this.get('value'));
    }

    Ember.run.once(this, 'checked'); // manual observer

    // don't trigger our click handler if the value has just changed
    // as Chrome fires change event before click event
    this.set('deferClick', true);
    Ember.run.next(this, function () {
      this.set('deferClick', false);
    });
  }

});
