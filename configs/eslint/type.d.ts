declare module '@eslint/js' {
  // Why the hell doesn't eslint themselves export their types?
  import type { Linter } from 'eslint';

  export const configs: {
    readonly recommended: { readonly rules: Readonly<Linter.RulesRecord> };
    readonly all: { readonly rules: Readonly<Linter.RulesRecord> };
  };
}

declare module 'eslint-plugin-import' {
  import type { Linter, Rule } from 'eslint';

  export const configs: {
    recommended: { rules: Linter.RulesRecord };
  };
  export const rules: Record<string, Rule.RuleModule>;
}

declare module '@next/eslint-plugin-next' {
  import type { Linter, Rule } from 'eslint';

  export const configs: {
    recommended: { rules: Linter.RulesRecord };
    'core-web-vitals': { rules: Linter.RulesRecord };
  };
  export const rules: Record<string, Rule.RuleModule>;
}
