'use strict';

define(function() {
  return {
    capitalize: function(phrase) {
      return phrase.charAt(0).toUpperCase() + phrase.slice(1);
    }
  };
});
