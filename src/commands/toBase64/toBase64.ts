'use strict';
import { window, workspace, TextDocument } from 'vscode';


export async function toBase64(): Promise<string> {
	let editor = window.activeTextEditor;
	if (!editor) {
		return "";
	}

	var buffer = new Buffer(editor.document.getText());
	var strBase64 = buffer.toString('base64');
	
	workspace.openTextDocument({
        language: "",
		content: strBase64
    })
    .then(document => {
		console.log("Conversão para base64 efetuada com sucesso!");
		window.showTextDocument(document);
		return strBase64;
	});
	
	return "";
}
