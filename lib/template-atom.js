'use babel';

import TemplateAtomView from './template-atom-view';
import { CompositeDisposable } from 'atom';

export default {

  templateAtomView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.templateAtomView = new TemplateAtomView(state.templateAtomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.templateAtomView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'template-atom:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.templateAtomView.destroy();
  },

  serialize() {
    return {
      templateAtomViewState: this.templateAtomView.serialize()
    };
  },

  toggle() {
    console.log('TemplateAtom was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
