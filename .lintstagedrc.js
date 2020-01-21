// Lint-staged configuration
// https://github.com/okonet/lint-staged#configuration
module.exports = {
  '*.{js,jsx,ts,tsx}': ['prettier --write', 'git add'],
  '*.{css,less,scss,sass}': ['prettier --write', 'git add'],
  '*.{json,md}': ['prettier --write', 'git add'],
};
