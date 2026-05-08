/**
 * Conventional Commits config — Nexus Kids Academy
 * Tipos: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [0],
    'header-max-length': [2, 'always', 100],
  },
};
