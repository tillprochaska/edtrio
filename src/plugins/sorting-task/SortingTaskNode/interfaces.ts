export interface ILearningItemsList extends Array<ILearningItem> {};
export interface ILearningItem {
  term: string,
  description?: string,
};