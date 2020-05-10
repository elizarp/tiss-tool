'use strict';
import { window, workspace } from 'vscode';


export async function toBase64() {
	let editor = window.activeTextEditor;
	if (!editor) {
		return;
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
    });	
}
