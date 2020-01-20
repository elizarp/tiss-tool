// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { TextDocument } from 'vscode';

var DOMParser = require('xmldom').DOMParser;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Parabéns, a extensão "tiss-tool" foi ativada! Utilize Ctrl+Shift+P e digite TISS para pesquisar os comandos');

	let disposable = vscode.commands.registerCommand('extension.quantidadeBeneficiario', () => {
		let beneficiario = new Beneficiario();
		let editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		let doc = editor.document;
		let count = beneficiario._beneficiarioCount(doc);

		vscode.window.showInformationMessage(count + " beneficiários.");

	});

	context.subscriptions.push(disposable);

	let disposable2 = vscode.commands.registerCommand('extension.nomeContratado', () => {
		let prestador = new Prestador();
		let editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		let doc = editor.document;
		let nome = prestador._ContratadoNome(doc);

		vscode.window.showInformationMessage("Contratado:" + nome);

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }

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