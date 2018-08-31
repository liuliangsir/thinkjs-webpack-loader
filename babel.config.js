module.exports = {
  'presets': [
    [
      '@babel/preset-env',
      {
        'targets': {
          'node': 'current'
        },
        'shippedProposals': true,
        'modules': false
      }
    ]
  ],
  'plugins': [
    '@babel/plugin-external-helpers',
    [
      '@babel/plugin-transform-runtime', {
        'corejs': 2,
        'helpers': true,
        'regenerator': true,
        'useESModules': true
      }
    ],
    [
      '@babel/plugin-proposal-class-properties', {
        'loose': true
      }
    ],
    '@babel/plugin-transform-destructuring',
    '@babel/plugin-proposal-object-rest-spread'
  ],
  'comments': false
};
