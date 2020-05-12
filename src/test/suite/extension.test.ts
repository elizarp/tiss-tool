import * as assert from 'assert';

import * as vscode from 'vscode';
import { TestDataLoader } from "./../utils/test-data-loader";
import * as toBase64 from './../../commands/toBase64/toBase64';

suite('TISS Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');
	
	// Test tiss.extension.trocaOperadora
	test('Testando Troca Operadora', () => {
		//Arrange
		const expectedBase64 = TestDataLoader.load('xml-base64-expected.txt');
		const unformattedBase64 = TestDataLoader.load('xml-base64-not-encoded.xml');
		
		vscode.workspace.openTextDocument({
			language: "",
			content: unformattedBase64
		})
		.then(document => {
			console.log("Conversão para base64 efetuada com sucesso!");
			vscode.window.showTextDocument(document);
		}).then(x=> {
			//Act
			toBase64.toBase64();
		}).then(x=>{
			let editor = vscode.window.activeTextEditor;
			if (!editor) { return; }
			let doc = editor.document;
			
			let actualFormattedBase64 = doc.getText();
			//Assert
			assert.equal(actualFormattedBase64, expectedBase64, "Actual formatted Base64 does not match expected formatted Base64.");
		});	

		

		
	});

});
