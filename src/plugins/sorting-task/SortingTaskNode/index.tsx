import React from "react";
import EditView from "./EditView";
import ReadView from "./ReadView";

import { ITermsList } from "./interfaces";

interface IProps {
  attributes: object,
  children: [ React.Component ],
  readOnly: boolean,
  isFocused: boolean,
  editor: any,
  node: any,
  parent: any,
};

interface IState {
  terms: ITermsList,
};

/*
 * `SortingTaskNode` is rendered by `sortingTask` blocks. `sortingTask`
 * are void blocks. I. e., by default, users won’t be able to edit its
 * contents or values. Instead, they’ll have to use the user interface
 * provided by this component.
 */
export default class SortingTaskNode extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    const defaultState = {
      terms: [ { term: 'Term A', description: 'Description A' } ],
    };

    this.state = this.loadState() || defaultState;
  }

  public render() {
    const { attributes, readOnly, isFocused } = this.props;

    return (
      <div
        className={ `plugin-wrapper ${ isFocused && 'selected' }` }
        onClick={this.clickHandler()}
        onFocus={this.focusHandler()}
        {...attributes}
       >
        { readOnly
          ? <ReadView terms={this.state.terms} />
          : <EditView terms={this.state.terms} onEdit={this.editHandler()} />
        }
      </div>
    );
  }

  /*
   * Returns a click handler to all events for this component.
   * By default Slate will set focus back to the editor when
   * clicking on a void block. This would remove focus from any
   * form element in this component, so we just stop click events
   * from bubbling up.
   */
  protected clickHandler() {
    return (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
    };
  }

  /*
   * Returns a focus handler. By default, Slate won’t focus the
   * sorting task block when the user focuses element inside of 
   * it, so we need to recreate this behaviour manually.
   */
  protected focusHandler() {
    return (event: React.FocusEvent<HTMLDivElement>) => {};
  }

  /*
   * Returns an event handler (and makes sure that the context
   * is correctly bound).
   */
  protected editHandler() {
    return (terms: ITermsList) => {
      this.setState({ terms }, this.persistState);
    };
  }

  /*
   * This method saves the current (and possibly updated)
   * state in the block’s `data` property. This is important,
   * as the component state itself won’t be persistet.
   */
  protected persistState() {
    this.props.editor.setNodeByKey(
      this.props.node.key, {
      data: {
        state: this.state,
      },
    });
  }

  /* 
   * Loads the state from the block’s `data` property. Slate
   * stores data in immutable data structures, so we need to
   * convert this back to a plain JS object.
   */
  protected loadState(): any {
    return this.props.node.data.get("state");
  }

}