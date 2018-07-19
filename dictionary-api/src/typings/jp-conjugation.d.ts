declare module "jp-conjugation" {
  export type ConjugateResponse = {
    name: string;
    form: string;
  };

  export const enum VERB_TYPE {
    v5u,
    v5k,
    v5g,
    v5s,
    v5t,
    v5m,
    v5b,
    v5n,
    v5r,
    v1
  }

  export type UncojugateResponse = {
    word: string;
    found: string;
    verbType: VERB_TYPE;
  };

  export function conjugate(
    verb: string,
    type?: VERB_TYPE
  ): [ConjugateResponse];

  export function unconjugate(verb: string): [[UncojugateResponse]];
}
