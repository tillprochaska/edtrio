import React from "react";
import { ILearningItem, ILearningItems, ILearningItemsWithKnownState } from "../interfaces";
import FlipCard from "./FlipCard";
import ResultCard from "./ResultCard";

import "./style.scss";

interface IProps {
  learningItems: ILearningItems,
};

interface IState {
	learningItems: ILearningItemsWithKnownState,
}

export default class ReadView extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = { learningItems: this.props.learningItems.filter((learningItem: ILearningItem) => (learningItem.term && learningItem.description)).map((learningItem: ILearningItem) => ({...learningItem, isSolved: false, wasViewed: false})) }
  }

  public render() {
    const unknownItemsCount = this.state.learningItems.filter(item => !item.isSolved).length;
    const learningItems = this.state.learningItems.map((learningItem, index) => {
      return (!learningItem.isSolved && !learningItem.wasViewed) ?
        (
          <FlipCard key={index} learningItem={learningItem} nextCard={this.nextCard(index)} />
        )
      :
        <React.Fragment key={index}/>
    });

    return <ol className="learning-items__cards">
      {learningItems}
      <ResultCard unknownItemsCount={unknownItemsCount} continue={this.continue()} reset={this.reset()} />
      </ol>;
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

  protected continue() {
    return () => {
      const learningItems = this.state.learningItems.map(learningItem => ({...learningItem, wasViewed: false}));
      this.setState( { learningItems } );
    }
  }

  protected reset() {
    return () => {
      const learningItems = this.state.learningItems.map(learningItem => ({...learningItem, wasViewed: false, isSolved: false}));
      this.setState( { learningItems } );
    }
  }
}