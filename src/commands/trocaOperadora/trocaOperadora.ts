'use strict';
import { window, Range, Selection, TextEditorEdit, TextDocument } from 'vscode';
var DOMParser = require('xmldom').DOMParser;


export async function trocaOperadora() {
	let editor = window.activeTextEditor;
	if (!editor) {
		return;
	}

	let doc = editor.document;
	const selection = editor.selection;
	let novoRegistroANS = await window.showInputBox({ placeHolder: 'Digite novo código da operadora.' }) || '';
	if (!novoRegistroANS){
		return;
	}

	var tag_registro_ans_begin = '<ans:registroANS>';
	var tag_registro_ans_end = '</ans:registroANS>';
	var find_begin = getRangeByText(doc, selection, tag_registro_ans_begin);
	var find_end = getRangeByText(doc, selection, tag_registro_ans_end);
	var find_registro_ans = new Range(find_begin.end,find_end.start);
	
	editor.selection = new Selection(find_registro_ans.start, find_registro_ans.end);
	editor.edit(editBuilder => {
		editBuilder.replace(find_registro_ans, novoRegistroANS);
	});
}

function getRangeByText(doc: TextDocument, selection: Selection, strToFind: string): Range {
	var match_start = doc.positionAt(0);
	var match_end = doc.positionAt(0);
	let end_offset = doc.offsetAt(selection.end);
	let match = doc.getText().indexOf(strToFind, end_offset);
	if (match >= 0) {
		match_start = doc.positionAt(match);
		match_end = doc.positionAt(match + strToFind.length);
	}

	return new Range(match_start, match_end);
}