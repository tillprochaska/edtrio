import React from "react";
import { ITermsList } from "../interfaces";

interface IProps {
  terms: ITermsList,
};

export default class ReadView extends React.PureComponent<IProps> {

  public render() {
    const terms = this.props.terms.map((term, index) => {
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