import { createBaseTestManager } from '@test-fixtures/schema-helpers';
import { pmBuild } from 'jest-prosemirror';
import { NodeExtension } from '../';
import { NodeGroup } from '../constants';
import { fromHTML } from '../helpers';
import { NodeExtensionSpec } from '../types';

class CustomExtension extends NodeExtension {
  get name() {
    return 'custom' as const;
  }

  get schema(): NodeExtensionSpec {
    return {
      content: 'inline*',
      group: NodeGroup.Block,
      attrs: this.extraAttrs(),
      draggable: false,
      parseDOM: [
        {
          tag: 'p',
          getAttrs: node => this.getExtraAttrs(node as Element),
        },
      ],
      toDOM: () => ['p', 0],
    };
  }
}

describe('extraAttrs', () => {
  const run = 'true';
  const title = 'awesome';

  const { schema } = createBaseTestManager([
    {
      extension: new CustomExtension({
        extraAttrs: [
          'title',
          ['run', 'failure', 'data-run'],
          {
            default: 'yo',
            getAttrs: domNode => (domNode as Element).getAttribute('simple'),
            name: 'crazy',
          },
        ],
      }),
      priority: 1,
    },
  ]);
  const { doc, custom, other } = pmBuild(schema, {
    custom: { nodeType: 'custom', run, title, crazy: 'yo' },
    other: { nodeType: 'custom', run, title, crazy: 'believe me' },
  });

  it('creates attrs with the correct shape', () => {
    expect(schema.nodes.custom.spec.attrs).toEqual({
      title: { default: '' },
      run: { default: 'failure' },
      crazy: { default: 'yo' },
    });
  });

  it('parses the dom for extra attributes', () => {
    const node = fromHTML({
      content: `<p title="${title}" data-run="${run}">hello</p>`,
      schema,
    });

    const expected = doc(custom('hello'));
    expect(node).toEqualPMNode(expected);
  });

  it('support parsing with getAttrs method', () => {
    const node = fromHTML({
      content: `<p title="${title}" data-run="${run}" simple="believe me">hello</p>`,
      schema,
    });
    const expected = doc(other('hello'));
    expect(node).toEqualPMNode(expected);
  });
});
