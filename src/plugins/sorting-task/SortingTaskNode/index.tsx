import React from "react";
import EditView from "./EditView";
import ReadView from "./ReadView";

interface IProps {
  attributes: object,
  children: [ React.Component ],
  readOnly: boolean
};

/*
 * `SortingTaskNode` is rendered by `sortingTask` blocks. `sortingTask`
 * are void blocks. I. e., by default, users won’t be able to edit its
 * contents or values. Instead, they’ll have to use the user interface
 * provided by this component.
 */
export default class SortingTaskNode extends React.Component<IProps, {}> {

  public render() {
    const { attributes, readOnly } = this.props;
    const ViewComponent = readOnly ? ReadView : EditView;

    return (
      <div {...attributes}>
        <ViewComponent />
      </div>
    );
  }

}