module.exports = {
  extends: ['eslint-config-bzc'],
  rules: {
    'max-len': ['error', 100, 2, {
      ignoreUrls: true,
      ignoreComments: true,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignorePattern: '^.*React\\$AbstractComponent.*',
    }],
    'no-useless-computed-key': 0,
  },
};
