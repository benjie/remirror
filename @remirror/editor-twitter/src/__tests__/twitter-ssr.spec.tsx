/**
 * @jest-environment node
 */

import React from 'react';
import { renderToString } from 'react-dom/server';

import { docNodeBasicJSON } from '@test-fixtures/object-nodes';
import { TwitterEditor } from '../';

test('it renders within an ssr environment', () => {
  // global.renderToString = renderToString;
  const reactString = renderToString(
    <TwitterEditor
      userData={[]}
      tagData={[]}
      onMentionChange={console.log}
      initialContent={docNodeBasicJSON}
      emojiData={{} as any}
    />,
  );
  expect(reactString).toInclude('basic');
});
