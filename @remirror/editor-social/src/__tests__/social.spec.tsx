import { render } from '@test-fixtures/testing-library';
import React from 'react';

import { docNodeBasicJSON } from '@test-fixtures/object-nodes';
import { SocialEditor } from '..';

test('should place the editor within the correct element', () => {
  const { getByTestId, getByRole } = render(
    <SocialEditor
      userData={[]}
      tagData={[]}
      onMentionChange={jest.fn()}
      initialContent={docNodeBasicJSON}
      emojiData={{} as any}
    />,
  );

  const editor = getByRole('textbox');
  const wrapper = getByTestId('remirror-editor');
  expect(wrapper).toContainElement(editor);
});