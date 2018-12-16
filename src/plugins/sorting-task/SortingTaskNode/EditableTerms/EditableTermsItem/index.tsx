import React from "react";
import { ITerm } from "../../interfaces";

interface IProps {
  term: ITerm,
  onEdit: (updateTerm: ITerm) => void,
};

export default class EditableTermsItem extends React.PureComponent<IProps> {

  public render() {
    return (
      <tr>
        <td>
          <input
            type="text"
            value={this.props.term.term}
            onChange={this.editHandler('term')}
            placeholder="Gib einen Begriff ein…"
          />
        </td>
        <td>
          <input
            type="text"
            value={this.props.term.description}
            onChange={this.editHandler('description')}
            placeholder="Gib eine Erklärung ein…"
          />
        </td>
      </tr>
    );
  }

  protected editHandler(key: string) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedTerm = this.props.term;
      updatedTerm[key] = event.target.value;
      this.props.onEdit(updatedTerm);
    };
  }

}