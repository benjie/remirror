<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [prosemirror-suggest](./prosemirror-suggest.md)

## prosemirror-suggest package

Primitives for building your prosemirror suggestion functionality.

\#\# The problem

You want to create a suggestion plugin for your prosemirror editor but are unsure how to get started. The suggestions could be for mentions, emojis, responding to a keypress with a dropdown of potential actions or anything that needs to extract a query from the current editor when a matching character is entered.

\#\# This solution

`prosemirror-suggest` provides the suggestion primitives you will need for within your editor. It doesn't try to be magical and even with this library setting up suggestions can be difficult. However, with this toolkit, you will be able to build pretty much any suggestion plugin you can think of.

\#\# Installation

```bash
yarn add prosemirror-suggest prosemirror-view

```
\#\# Getting Started

The configuration of prosemirror suggests is based around an object which defines the suggestion behaviour. This configuration is passed the `suggestion` method which adds all the suggestion plugins to the editor.

In the following example we're creating an emoji suggestion plugin that responds to the colon character with a query and presents a list of matching emojis based on the query typed so far.

```ts
import { Suggester, suggest } from 'prosemirror-suggest';

const maxResults = 10;
let selectedIndex = 0;
let emojiList: string[] = [];
let showSuggestions = false;

const suggestEmojis: Suggester = {
  // By default decorations are used to highlight the currently matched
  // suggestion in the dom.
  // In this example we don't need decorations (in fact they cause problems when the
  // emoji string replaces the query text in the dom).
  ignoreDecorations: true,
  char: ':', // The character to match against
  name: 'emoji-suggestion', // a unique name
  appendText: '', // Text to append to the created match

  // Keybindings are similar to prosemirror keymaps with a few extra niceties.
  // The key identifier can also include modifiers (e.g.) `Cmd-Space: () => false`
  // Return true to prevent any further keyboard handlers from running.
  keyBindings: {
    ArrowUp: () => {
      selectedIndex = rotateSelectionBackwards(selectedIndex, emojiList.length);
    },
    ArrowDown: () => {
      selectedIndex = rotateSelectionForwards(selectedIndex, emojiList.length);
    },
    Enter: ({ command }) => {
      if (showSuggestions) {
        command(emojiList[selectedIndex]);
      }
    },
    Esc: () => {
      showSuggestions = false;
    },
  },

  onChange: params => {
    const query = params.query.full;
    emojiList = sortEmojiMatches({ query, maxResults });
    selectedIndex = 0;
    showSuggestions = true;
  },

  onExit: () => {
    showSuggestions = false;
    emojiList = [];
    selectedIndex = 0;
  },

  // Create a  function that is passed into the change, exit and keybinding handlers.
  // This is useful when these handlers are called in a different part of the app.
  createCommand: ({ match, view }) => {
    return (emoji,skinVariation) => {
      if (!emoji) {
        throw new Error('An emoji is required when calling the emoji suggestions command');
      }

      const tr = view.state.tr; const { from, end: to } = match.range;
      tr.insertText(emoji, from, to); view.dispatch(tr);
    };
  },
};

 // Create the plugin with the above configuration. It also supports multiple plugins being added.
const suggestionPlugin = suggest(suggestEmojis);

 // Include the plugin in the created editor state.
const state = EditorState.create({schema,
  plugins: [suggestionPlugin],
});

```

## Enumerations

|  Enumeration | Description |
|  --- | --- |
|  [ActionTaken](./prosemirror-suggest.actiontaken.md) | The action taken on a suggestion |
|  [ChangeReason](./prosemirror-suggest.changereason.md) | The potential reason for changes |
|  [ExitReason](./prosemirror-suggest.exitreason.md) | The potential reasons for an exit |

## Interfaces

|  Interface | Description |
|  --- | --- |
|  [CompareMatchParams](./prosemirror-suggest.comparematchparams.md) | Compares two matches. |
|  [CreateSuggestCommandParams](./prosemirror-suggest.createsuggestcommandparams.md) |  |
|  [FromToEndParams](./prosemirror-suggest.fromtoendparams.md) |  |
|  [GetStageParams](./prosemirror-suggest.getstageparams.md) |  |
|  [MatchValue](./prosemirror-suggest.matchvalue.md) | The match value with the full and partial text. |
|  [OnKeyDownParams](./prosemirror-suggest.onkeydownparams.md) |  |
|  [ReasonMatchParams](./prosemirror-suggest.reasonmatchparams.md) |  |
|  [ReasonParams](./prosemirror-suggest.reasonparams.md) |  |
|  [StageParams](./prosemirror-suggest.stageparams.md) |  |
|  [SuggestCallbackParams](./prosemirror-suggest.suggestcallbackparams.md) |  |
|  [SuggestChangeHandlerParams](./prosemirror-suggest.suggestchangehandlerparams.md) |  |
|  [SuggestCharacterEntryParams](./prosemirror-suggest.suggestcharacterentryparams.md) |  |
|  [SuggestCommandParams](./prosemirror-suggest.suggestcommandparams.md) | The command |
|  [Suggester](./prosemirror-suggest.suggester.md) | This <code>Suggester</code> interface provides the options object which is used within the [suggest](./prosemirror-suggest.suggest.md) plugin creator. |
|  [SuggesterParams](./prosemirror-suggest.suggesterparams.md) |  |
|  [SuggestExitHandlerParams](./prosemirror-suggest.suggestexithandlerparams.md) |  |
|  [SuggestKeyBindingParams](./prosemirror-suggest.suggestkeybindingparams.md) |  |
|  [SuggestReasonMap](./prosemirror-suggest.suggestreasonmap.md) |  |
|  [SuggestStateMatch](./prosemirror-suggest.suggeststatematch.md) |  |
|  [SuggestStateMatchParams](./prosemirror-suggest.suggeststatematchparams.md) |  |
|  [SuggestStateMatchReason](./prosemirror-suggest.suggeststatematchreason.md) |  |

## Variables

|  Variable | Description |
|  --- | --- |
|  [DEFAULT\_SUGGEST\_ACTIONS](./prosemirror-suggest.default_suggest_actions.md) |  |
|  [DEFAULT\_SUGGESTER](./prosemirror-suggest.default_suggester.md) |  |
|  [getSuggestPluginState](./prosemirror-suggest.getsuggestpluginstate.md) | Get the state of the suggest plugin. |
|  [suggest](./prosemirror-suggest.suggest.md) | This creates a suggestion plugin with all the suggestions provided. |

## Type Aliases

|  Type Alias | Description |
|  --- | --- |
|  [SuggestCallback](./prosemirror-suggest.suggestcallback.md) | The handler callback signature. |
|  [SuggestKeyBinding](./prosemirror-suggest.suggestkeybinding.md) | A method for performing actions when a certain key / patter is pressed.<!-- -->Return true to prevent any further bubbling of the key event and to stop other handlers from also processing the event. |
|  [SuggestKeyBindingMap](./prosemirror-suggest.suggestkeybindingmap.md) | The SuggestKeyBinding object. |
|  [SuggestReplacementType](./prosemirror-suggest.suggestreplacementtype.md) | Determines whether to replace the full match or the partial match (up to the cursor position). |
|  [SuggestStage](./prosemirror-suggest.suggeststage.md) | A suggestion can have two stages. When it is <code>new</code> and when it has already been created and is now being <code>edit</code>ed.<!-- -->Separating the stages allows for greater control in how mentions are updated.<!-- -->The edit state is only applicable for editable suggestions. Most nodes and text insertions can't be edited once created. |
