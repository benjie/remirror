import { ExampleWysiwygEditor } from './wysiwyg';
import { useCallback, useState, FC } from 'react';
import { EditorState } from '@remirror/core';
import { RemirrorStateListenerParams } from '@remirror/react';
import { WysiwygEditorProps } from '@remirror/editor-wysiwyg';

export const ExampleWysiwygMarkdownEditor: FC<WysiwygEditorProps> = props => {
  const [editorState, setEditorState] = useState<EditorState>();
  const onStateChange = useCallback((params: RemirrorStateListenerParams<any>) => {
    setEditorState(params.newState);
  }, []);
  return (
    <div>
      <ExampleWysiwygEditor {...props} onStateChange={onStateChange} value={editorState} />
      <textarea value={'PLACEHOLDER'} readOnly={true} />
    </div>
  );
};
