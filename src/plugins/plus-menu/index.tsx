import React, { Fragment } from "react";
import PlusMenu from "./PlusMenu";

export default function PlusMenuPlugin() {
  return {
    changes: {},
    helpers: {},
    components: {
      PlusMenu,
    },
    plugins: [addPlusMenuBesideEditor],
  };
}

const addPlusMenuBesideEditor = {
  renderEditor(props: any, editor: any, next: any) {
    // If the editor currently isn’t focused, or if
    // no block node is focused, do not render the
    // plus menu.
    const { isFocused } = editor.value.selection;
    const focusedBlock = editor.value.focusBlock;

    // If the focused block is a void block, users won’t
    // be able to edit its content or add children, thus
    // the plus menu would be useless.
    const isVoidBlock = editor.isVoid(focusedBlock);

    // Also, there are some block types where the plus menu
    // should not be displayed, e. g. the title block.
    const ignoredBlocks = ['title'];
    const isIgnoredBlock = ignoredBlocks.includes(focusedBlock.type);

    if(!isFocused || !focusedBlock || isVoidBlock || isIgnoredBlock) {
      return next();
    }

    return (
      <Fragment>
        {<PlusMenu editor={editor} startBlock={editor.value.startBlock} />}
        {next()}
      </Fragment>
    );
  },
};
