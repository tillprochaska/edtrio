import React from "react";
import { ILearningItems } from "../interfaces";

import "./style.scss";

interface IProps {
  learningItems: ILearningItems,
};

export default class ReadView extends React.PureComponent<IProps> {

  public render() {
    const learningItems = this.props.learningItems
    .filter(learningItem => learningItem.term && learningItem.description)
    .map((learningItem, index) => {
      return (
        <React.Fragment key={index}>
          <li className="flip-card">
            <div className="flip-card__inner">
              <div className="flip-card__front flip-card__content">
                <h2 className="flip-card__title">Kannst du diesen Begriff erklären?</h2>
                <p className="flip-card__text">{learningItem.term}</p>
              </div>
              <div className="flip-card__back flip-card__content">
                <h2 className="flip-card__title">Erklärung:</h2>
                <p className="flip-card__text">{learningItem.description}</p>
              </div>
            </div>
          </li>
        </React.Fragment>
      );
    });

    return <ol className="learning-items">{learningItems}</ol>;
  }

}