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
  ],
};

if (process.env.NODE_ENV === 'production') {
  const ignoreGlob = [
    '*/**/*.spec.js',
    '*/**/testUtils/*',
    '*/**/*.stories.js',
    '*/**/story',
  ];

  config.presets[0][1].modules = false;
  config.ignore = config.ignore
    ? config.ignore.concat(ignoreGlob)
    : ignoreGlob;
}

module.exports = config;
