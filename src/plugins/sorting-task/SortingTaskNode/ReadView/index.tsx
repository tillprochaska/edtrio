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
        <div className="flip-card">
          <div className="flip-card-inner">
            <dt className="flip-card-front flip-card-content">
              <h2 className="flip-card-title">Kannst du diesen Begriff erklären?</h2>
              <p>{learningItem.term}</p>
            </dt>
            <dd className="flip-card-back flip-card-content">
              <h2 className="flip-card-title">Erklärung:</h2>
              <p>{learningItem.description}</p>
            </dd>
          </div>
        </div>
        </React.Fragment>
      );
    });

    return <dl className="learning-items">{learningItems}</dl>;
  }

}