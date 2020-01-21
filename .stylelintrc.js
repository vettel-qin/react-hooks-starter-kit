// Stylelint configuration
// https://stylelint.io/user-guide/configuration/
module.exports = {
  // The standard config based on a handful of CSS style guides
  // https://github.com/stylelint/stylelint-config-standard
  extends: 'stylelint-config-standard',

  plugins: [
    // stylelint plugin to sort CSS rules content with specified order
    // https://github.com/hudochenkov/stylelint-order
    'stylelint-order',
  ],

  rules: {
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          // CSS Modules composition
          // https://github.com/css-modules/css-modules#composition
          'composes',
        ],
      },
    ],

    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          // CSS Modules scope
          // https://github.com/css-modules/css-modules#exceptions
          'global',
          'local',
        ],
      },
    ],

    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          // Sass directives
          // http://sass-lang.com/documentation/file.SASS_REFERENCE.html
          'at-root',
          'content',
          'extend',
          'include',
          'mixin',
          'function',
          'return',
          'debug',
          'warn',
          'error',
          'if',
          'else',
          'for',
          'each',
          'while',
        ],
      },
    ],

    // Use single quotes around strings
    // https://stylelint.io/user-guide/rules/string-quotes/
    'string-quotes': 'single',

    // https://github.com/hudochenkov/stylelint-order/blob/master/rules/order/README.md
    'order/order': ['custom-properties', 'dollar-variables', 'at-variables', 'declarations', 'at-rules', 'rules'],

    // https://github.com/hudochenkov/stylelint-order/blob/master/rules/properties-order/README.md
    'order/properties-order': [],
  },
};
