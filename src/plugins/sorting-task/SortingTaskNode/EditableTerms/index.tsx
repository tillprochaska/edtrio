import React from "react";
import { ITerm, ITermsList } from "../interfaces";
import EditableTermItem from "./EditableTermsItem";

interface IProps {
  terms: ITermsList,
  onEdit: (updatedTerms: ITermsList) => void,
}

export default class EditableTerms extends React.PureComponent<IProps> {

  public render() {
    const terms = this.props.terms.map((term, index) => {
      return (
        <EditableTermItem
          key={index}
          term={term}
          onEdit={this.editHandler(index)}
        />
      );
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Begriff</th>
            <th>Erklärung</th>
          </tr>
        </thead>
        <tbody>
          {terms}
        </tbody>
      </table>
    );
  }

  protected editHandler(index: number) {
    return (updatedTerm: ITerm) => {
      const terms = this.props.terms;
      terms[index] = updatedTerm;
      this.props.onEdit(terms);
    };
  }

}