var CompositeDisposable = require('atom').CompositeDisposable

var POSSIBLE_PREFIXES = [
  'it(',
  'beforeEach(',
  'afterEach(',
  'before(',
  'after(',

  'it (',
  'beforeEach (',
  'afterEach (',
  'before (',
  'after (',
]

var MochaFold =
module.exports = {
  subscriptions: null,

  activate: function() {
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'mocha-fold:fold': MochaFold.fold,
      })
    )
  },

  deactivate: function() {
    this.subscriptions.dispose()
  },

  fold: function() {
    var editor = atom.workspace.getActiveTextEditor()

    var lineCount = editor.getLineCount()

    for (var line = 0; line < lineCount; line++) {
      var lineContents = editor.lineTextForBufferRow(line)

      for (var i = 0; i < POSSIBLE_PREFIXES.length; i++) {
        var prefix = POSSIBLE_PREFIXES[i]

        if (
          lineContents.trim().substring(0, prefix.length) === prefix &&
          editor.isFoldableAtBufferRow(line)
        ) {
          editor.foldBufferRow(line)
        }
      }
    }
  },
}
