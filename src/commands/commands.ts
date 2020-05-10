'use strict';
import { commands, env, ExtensionContext, Position, Range, Selection, SnippetString, TextDocument, TextEditor, window, workspace, WorkspaceEdit } from 'vscode';
import { trocaOperadora } from './trocaOperadora/trocaOperadora';
import { toBase64 } from './toBase64/toBase64';
var DOMParser = require('xmldom').DOMParser;


export function activate(context: ExtensionContext) {
	context.subscriptions.push(
		commands.registerCommand('tiss.extension.quantidadeBeneficiario', quantidadeBeneficiario),
		commands.registerCommand('tiss.extension.nomeContratado', nomeContratado),
		commands.registerCommand('tiss.extension.trocaOperadora', trocaOperadora),
		commands.registerCommand('tiss.extension.toBase64', toBase64)
	);
}

function quantidadeBeneficiario() {
	let beneficiario = new Beneficiario();
	let editor = window.activeTextEditor;
	if (!editor) {
		return;
	}

	let doc = editor.document;
	let count = beneficiario._beneficiarioCount(doc);

	window.showInformationMessage(count + " beneficiários.");
}

function nomeContratado() {
	let prestador = new Prestador();
	let editor = window.activeTextEditor;
	if (!editor) {
		return;
	}

	let doc = editor.document;
	let nome = prestador._ContratadoNome(doc);

	window.showInformationMessage("Contratado:" + nome);
}



export class Beneficiario {

	public _beneficiarioCount(doc: TextDocument): number {
		var xmldoc = new DOMParser().parseFromString(doc.getText(), 'text/xml');
		return xmldoc.getElementsByTagName("ans:beneficiario").length;
	}
}

export class Prestador {

	public _ContratadoNome(doc: TextDocument): string {
		var xmldoc = new DOMParser().parseFromString(doc.getText(), 'text/xml');
		return xmldoc.getElementsByTagName("ans:nomeContratado")[0].textContent;
	}
}
