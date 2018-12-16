import React from "react";
import { Editor } from "slate";
import SortingTaskNode from "./SortingTaskNode";

export default () => {
  return {
    plugins: [
      RenderPlugin,
    ],
  };
}

const RenderPlugin = {
  renderNode(props: any, editor: Editor, next: () => void) {
    if(props.node.type === "sortingTask") {
      return <SortingTaskNode {...props} />;
    }

    return next();
  },
};