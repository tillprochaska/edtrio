import React from "react";
import { ILearningItem, ILearningItems } from "../interfaces";
import FlipCard from "./FlipCard";

import "./style.scss";

interface IProps {
  learningItems: ILearningItems,
};

interface ILearningItemsWithKnownState extends Array<ILearningItemWithKnownState> {};
interface ILearningItemWithKnownState {
  term: string,
  description?: string,
  isSolved: boolean,
  wasViewed: boolean
};

interface IState {
	learningItems: ILearningItemsWithKnownState,
}

export default class ReadView extends React.Component<IProps, IState> {

  constructor(props: IProps) {
		super(props);
    this.state = { learningItems: this.props.learningItems.map((learningItem: ILearningItem) => ({...learningItem, isSolved: false, wasViewed: false})) }
  }

  public render() {
    const learningItems = this.state.learningItems
    .map((learningItem, index) => {
      return (learningItem.term && learningItem.description && !learningItem.isSolved && !learningItem.wasViewed) ?
        (
          <FlipCard key={index} learningItem={learningItem} nextCard={this.nextCard(index)} />
        )
      :
        <React.Fragment key={index}/>
    });

    return <ol className="learning-items__cards">{learningItems}</ol>;
  }

  protected nextCard(key: number) {
    return (answerKnown: boolean) => {
      return () => {
        const learningItems = this.state.learningItems;
        learningItems[key] = {
          ...learningItems[key],
          isSolved: answerKnown,
          wasViewed: true
        };
        this.setState( { learningItems } );
      }
    }
	}

}