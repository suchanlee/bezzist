/* @flow */

/**
 * Utils
 *
 * Utility class that contains many utility methods
 * that are useful in other classes.
 *
 * Contains:
 *  - Capitalization
 *  - set-to-list converter
 *  - list-to-set converter
 *  - list sorter by field
 *  - object remover from list
 */

'use strict';

var _ = require('underscore');

var PROFANITY_DICT = {
  'ass': true,
  'asshole': true,
  'jackass': true,
  'retard': true,
  'retarded': true,
  'fuck': true,
  'fucker': true,
  'fucked': true,
  'fucking': true,
  'motherfucker': true,
  'cockfucker': true,
  'bitch': true,
  'biatch': true,
  'shit': true,
  'shitty': true,
  'shitting': true,
  'cunt': true,
  'whore': true
};

/**
 * Exports declaration
 */
module.exports = {

  /**
   * Capitalizes the first letter of input string.
   *
   * @param  {string} phrase
   * @return {string}
   */
  capitalize: function(phrase: string): string {
    return phrase.charAt(0).toUpperCase() + phrase.slice(1);
  },

  /**
   * Sanitizes profanity from an input phrase. It keeps the
   * first letter of the word and turns the rest into asterisks (*).
   *
   * The profanity is found from a small pre-defined dictionary.
   *
   * @param  {string} phrase Phrase that needs to be sanitized
   * @return {string}        Sanitized phrase
   */
  sanitizeProfanity: function(phrase: string): string {
    var words = phrase.split(' ');
    for (var i = 0; i < words.length; i++) {
      if (words[i].trim().toLowerCase() in PROFANITY_DICT) {
        var asterisks = '';
        for (var j = 0; j < words[i].length - 1; j++) {
          asterisks += '*';
        }
        words[i] = words[i][0] + asterisks;
      }
    }
    return words.join(' ');
  },

  /**
   * Converts a given set, represented by { obj : true }
   * to a list. Order is not preserved as sets do not
   * have orders.
   *
   * @param {Object} set
   * @return {Array} list
   */
  setToList: function(set: object): Array<string> {
    var list = [];
    var keys = Object.keys(set);
    for (var i=0; i<keys.length; i++) {
      list.push(set[keys]);
    }
    return list;
  },

  /**
   * Conversts input list into a set represented by
   * { obj : true }.
   *
   * @param  {Array} list
   * @return {Object} set
   */
  listToSet: function(list: Array<object>): object {
    var set = {};
    for (var i=0; i<list.length; i++) {
      set[list[i]] = true;
    }
    return set;
  },

  /**
   * Sorts a given list by a specified key, where
   * the comparing value of the key is a number, in the
   * object in list. User can specify whether to
   * reverse sort the list by passing in boolean
   * reverse object. The key in object must not be
   * nested.
   *
   * @param  {Array} list
   * @param  {string} key
   * @param  {boolean} reverse
   * @return {Array}
   */
  sortByField: function(list: Array<object>, key: string, reverse: boolean): Array<object> {
    if (!list || list.length === 0) {
      return [];
    }

    var dir = 1;
    if (reverse) {
      dir = -1;
    }

    return list.sort(function(a, b) {
      var comp;
      if (_.isFunction(a[key]) && _.isFunction(b[key])) {
        comp = a[key]() - b[key]();
      } else {
        comp = a[key] - b[key];
      }
      if (comp === 0) {
        try {
          return a.getCreated().unix() - b.getCreated().unix();
        } catch(e) {
          // no op -- return as is.
          return dir * comp;
        }
      } else {
        return dir * comp;
      }
    });
  },

  /**
   * Reverse Sorts a given list by a specified key in the
   * object in list. The key in object must not be
   * nested.
   *
   * @param  {Array} list
   * @param  {string} key
   * @return {Array}
   */
  revSortByField: function(list: Array<object>, key: string): void {
    return this.sortByField(list, key, true);
  },

  /**
   * Removes an item from list, if it is in list.
   *
   * @param  {list} list
   * @param  {item} item
   * @return {list} list
   */
  removeFromList: function(list: Array<object>, item: object): Array<object> {
    var idx = list.indexOf(item);
    if (idx > -1) {
      list.splice(idx, 1);
    }
    return list;
  }

}
