const config = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { browsers: ['last 2 versions', 'safari >= 7'] },
      },
    ],
    '@babel/preset-react',
    '@babel/preset-flow',
  ],
  plugins: [
    '@babel/plugin-transform-modules-commonjs',
    'babel-plugin-transform-flow-enums',
  ],
};

if (process.env.NODE_ENV === 'production') {
  const ignoreGlob = [
    '*/**/*.spec.js',
    '*/**/testUtils/*',
  ];

  if (process.env.MODE !== 'website') {
    ignoreGlob.push('*/**/*.stories.js');
  }

  config.presets[0][1].modules = false;
  config.ignore = config.ignore
    ? config.ignore.concat(ignoreGlob)
    : ignoreGlob;
}

module.exports = config;
