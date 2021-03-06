import { AnyExtension, EditorStateParams, ManagerParams, PlainObject } from '@remirror/core';
import { mapProps, ReactSerializer } from '@remirror/renderer-react';
import React from 'react';

export interface RemirrorSSRProps<GExtensions extends AnyExtension[] = AnyExtension[]>
  extends EditorStateParams,
    ManagerParams<GExtensions> {
  /**
   * The attributes to pass into the root div element.
   */
  attributes: PlainObject;
  /**
   * Whether or not the editor is in an editable state
   */
  editable: boolean;
}

/**
 * Remirror SSR component used for rendering in non dom environments
 */
export const RemirrorSSR = <GExtensions extends AnyExtension[] = AnyExtension[]>({
  attributes,
  manager,
  state,
  editable,
}: RemirrorSSRProps<GExtensions>) => {
  const outerProps = mapProps(attributes);
  const ssrElement = ReactSerializer.fromExtensionManager(manager).serializeFragment(state.doc.content);
  const transformedElement = manager.ssrTransformer(ssrElement);
  return (
    <div {...outerProps} suppressContentEditableWarning={true} contentEditable={editable}>
      {transformedElement}
    </div>
  );
};
