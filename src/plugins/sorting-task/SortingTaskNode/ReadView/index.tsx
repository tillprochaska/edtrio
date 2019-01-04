import React from "react";
import { ILearningItemsList } from "../interfaces";

interface IProps {
  learningItems: ILearningItemsList,
};

export default class ReadView extends React.PureComponent<IProps> {

  public render() {
    const learningItems = this.props.learningItems.map((learningItem, index) => {
      return (
        <React.Fragment key={index}>
          <dt>{learningItem.term}</dt>
          <dd>{learningItem.description}</dd>
        </React.Fragment>
      );
    });

    return <dl>{learningItems}</dl>;
  }

}