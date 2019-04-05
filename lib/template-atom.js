'use babel';

import TemplateAtomView from './template-atom-view';
import {
    CompositeDisposable
} from 'atom';

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
        let editor
        let self = this
        if (editor = atom.workspace.getActiveTextEditor()) {
            let language = editor.getGrammar().name
            //atom.notifications.addInfo("language is: " + language)
            switch (language) {
                case 'Null Grammar':
                    atom.notifications.addError('Programming language not set! Please define it in the bottom right corner.')
                    break;
                case 'Java':
                    editor.insertText('package /* package name */ ;\n\nimport java.util.*;\nimport java.io.*;\nimport java.awt.*;\n\npublic class Main {\n\tpublic static void main(String[] args) {\n\t\t/* code */\n\t}\n}');
                    break;
                case 'C':
                    editor.insertText('#include <stdio.h>\n\nint main()\n{\n\tprintf("Hello world!");\n\treturn 0;\n}');
                    break;
                case 'CSS':
                    editor.insertText('/*CSS Template*/\n\n/* Reset */\n\nhtml, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n\narticle, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\n\nbody {\n\tline-height: 1;\n}\n\nol, ul {\n\tlist-style: none;\n}\n\nblockquote, q {\n\tquotes: none;\n}\n\nblockquote:before, blockquote:after, q:before, q:after {\n\tcontent: \'\';\n\tcontent: none;\n}\n\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\nbody {\n\t-webkit-text-size-adjust: none;\n}');
					break;
				case 'HTML':
					editor.insertText('!<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<title><!--Title goes here--></title>\n\t</head>\n\n\t<body>\n\t\t<p>\n\t\t\t<!--Actual Website content goes here-->\n\t\t</p>\n\t</body>\n</html>');
                    break;
                case 'C++':
                    editor.insertText('#include <iostream>\n\nint main(){\n\t/* code */\n\treturn 0;\n}');
                    break;
                case 'Go':
                    editor.insertText('package main\n\nfunc main() {\n\t/* code */\n}');
                    break;
                case 'Makefile':
                    editor.insertText('SOURCE = #file name(s) here!\nITEM = #complied file name here!\n\nrun : compile\n\t./$(SOURCE)\n\ndebug : $(ITEM)\n\tgdb $(ITEM)\n\ncompile : $(SOURCE)\n\tgcc -Wall -g -o $(ITEM) $(SOURCE)\n\nclean :\n\t-rm $(ITEM)\n\ncompress: $(SOURCE)\n\tmkdir $(ITEM)_$(USER)\n\tcp $(SOURCE) $(ITEM)_$(USER)\n\ttar -cvzf $(ITEM)_$(USER).tar.gz $(ITEM)_$(USER)\n\trm -r $(ITEM)_$(USER)');
                    break;
                case 'PHP':
                    editor.insertText('<?php \n\t/* code */\n?>');
                    break;
                default:
                    atom.notifications.addError('Language is not supported, you can go to the \'~/template-atom/lib/template-atom.js\' file and add you template yourself!');
            }
        }
    }

};
