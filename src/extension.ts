// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ExtensionContext, languages, window, workspace } from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as commands from './commands/commands';
import { getNewFeatureMsg, showChangelog } from './util';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Parabéns, a extensão "tiss-tool" foi ativada! Utilize Ctrl+Shift+P e digite TISS para pesquisar os comandos');
	activateTISSExt(context);
}

// this method is called when your extension is deactivated
export function deactivate() { }

function activateTISSExt(context: ExtensionContext) {
	//Commands
	commands.activate(context);
}

function newVersionMessage(extensionPath: string) {
    let data: string, currentVersion: string;
    try {
        data = fs.readFileSync(`${extensionPath}${path.sep}package.json`).toString();
        currentVersion = JSON.parse(data).version;
        if (
            fs.existsSync(`${extensionPath}${path.sep}VERSION`)
            && fs.readFileSync(`${extensionPath}${path.sep}VERSION`).toString() === currentVersion
        ) {
            return;
        }
        fs.writeFileSync(`${extensionPath}${path.sep}VERSION`, currentVersion);
    } catch (error) {
        console.log(error);
        return;
    }
    const featureMsg = getNewFeatureMsg(currentVersion);
    if (featureMsg === undefined) { return; }
    //const message1 = localize("showMe");
	//const message2 = localize("dismiss");
	const message1 = "";
	const message2 = "";
    window.showInformationMessage(featureMsg, message1, message2).then(option => {
        switch (option) {
            case message1:
                showChangelog();
            case message2:
                break;
        }
    });
}