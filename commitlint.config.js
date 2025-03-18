module.exports = {
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
        rubik: ["var(--font-rubik)"],
        bagnard: ["var(--font-bagnard)"],
      },
    },
  },
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "chore",
        "style",
        "refactor",
        "ci",
        "test",
        "revert",
        "perf",
        "vercel",
      ],
    ],
  },
};
