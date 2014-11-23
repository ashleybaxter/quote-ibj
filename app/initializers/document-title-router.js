import Ember from 'ember';

export function initialize(/* container, application */) {
  // Extend Ember.Route to add support for sensible
  // document.title integration.
  Ember.Route.reopen({

    // `titleToken` can either be a static string or a function
    // that accepts a model object and returns a string (or array
    // of strings if there are multiple tokens).
    titleToken: null,

    // `title` can either be a static string or a function
    // that accepts an array of tokens and returns a string
    // that will be the document title. The `collectTitleTokens` action
    // stops bubbling once a route is encountered that has a `title`
    // defined.
    title: null,

    // Provided by Ember
    _actions: {
      collectTitleTokens: function(tokens) {
        var titleToken = this.titleToken;
        if (typeof this.titleToken === 'function') {
          titleToken = this.titleToken(this.currentModel);
        }

        if (Ember.isArray(titleToken)) {
          tokens.unshift.apply(this, titleToken);
        } else if (titleToken) {
          tokens.unshift(titleToken);
        }

        // If `title` exists, it signals the end of the
        // token-collection, and the title is decided right here.
        if (this.title) {
          var finalTitle;
          if (typeof this.title === 'function') {
            finalTitle = this.title(tokens);
          } else {
            // Tokens aren't even considered... a string
            // title just sledgehammer overwrites any children tokens.
            finalTitle = this.title;
          }

          // Stubbable fn that sets document.title
          this.router.setTitle(finalTitle);
        } else {
          // Continue bubbling.
          return true;
        }
      }
    }
  });

  Ember.Router.reopen({
    updateTitle: function() {
      this.send('collectTitleTokens', []);
    }.on('didTransition'),

    setTitle: function(title) {
      if (Ember.testing) {
        this._title = title;
      } else {
        window.document.title = title;
      }
    }
  });
};

export default {
  name: 'document-title-router',
  initialize: initialize
};
