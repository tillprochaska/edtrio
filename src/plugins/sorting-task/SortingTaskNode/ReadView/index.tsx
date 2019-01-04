import React from "react";
import { ILearningItemsList } from "../interfaces";

interface IProps {
  learningItems: ILearningItemsList,
};

export default class ReadView extends React.PureComponent<IProps> {

  public render() {
    const terms = this.props.learningItems.map((term, index) => {
      return (
        <React.Fragment key={index}>
          <dt>{term.term}</dt>
          <dd>{term.description}</dd>
        </React.Fragment>
      );
    });

    return <dl>{terms}</dl>;
  }

}