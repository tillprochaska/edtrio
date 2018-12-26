import React from "react";
import { ITerm, ITermsList } from "../interfaces";
import EditableTermsItem from "./EditableTermsItem";

interface IProps {
  terms: ITermsList,
  onEdit: (updatedTerms: ITermsList) => void,
}

export default class EditableTerms extends React.PureComponent<IProps> {

  public render() {
    const rows = this.getRows().map((term, index) => {
      return (
        <EditableTermsItem
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
          {rows}
        </tbody>
      </table>
    );
  }

  /*
   * This method returns a list of terms to render as rows.
   * If the last row is not empty, it appends an empty row.
   * This way, users are able to add a new term to the list
   * without the need to manuall append a row.
   */
  protected getRows(): ITermsList {
    const rows = this.props.terms;
    const lastRow = rows[rows.length - 1];
    const lastRowIsEmpty = lastRow && !lastRow.term && !lastRow.description;

    if(!lastRowIsEmpty) {
      rows.push({
        term: '',
        description: '',
      });
    }

    return rows;
  }

  protected editHandler(index: number) {
    return (updatedTerm: ITerm) => {
      const terms = this.props.terms;
      terms[index] = updatedTerm;

      // As there’s always an empty row append to the end of
      // the list in order to allow users to add new terms,
      // we need to remove it here in order to get the actual
      // list of non-empty terms.
      const lastTerm = terms[terms.length - 1];
      if(lastTerm && !lastTerm.term && !lastTerm.description) {
        terms.pop();
      }

      this.props.onEdit(terms);
    };
  }

}