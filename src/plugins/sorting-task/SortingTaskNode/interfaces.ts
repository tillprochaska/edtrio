export interface ITermsList extends Array<ITerm> {};
export interface ITerm {
  term: string,
  description?: string,
};