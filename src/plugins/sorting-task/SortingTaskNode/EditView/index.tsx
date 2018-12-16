import React from "react";
import EditableTerms from "../EditableTerms";
import { ITermsList } from "../interfaces";

interface IProps {
  terms: ITermsList,
  onEdit: (updatedTerms: ITermsList) => void,
};

export default class EditView extends React.PureComponent<IProps> {

  public render() {
    return (
      <React.Fragment>
        Welche Begriffe sollen deine Schüler*innen erklären?
        <EditableTerms
          terms={this.props.terms}
          onEdit={this.props.onEdit}
        />
      </React.Fragment>
    );
  }

}