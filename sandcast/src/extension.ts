// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
let textChangeDisposable: vscode.Disposable;

import * as http from 'http';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	//TODO: 1. track multiline code changes
	// 		2. track changes in multiple files
	// 		3. track file add/delete operations	

	textChangeDisposable = vscode.workspace.onDidChangeTextDocument((e) => {
		var changes = e.contentChanges;
		console.log("changes", changes);
		if (changes && changes.length > 0) {
			console.log("text:", changes[0].text);
			sendText(changes[0].text);
		}
	});

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
	});

	context.subscriptions.push(disposable);
}

export function sendText(text: string) {
	let baseUrl = 'http://localhost:8888/send?text=';
	let url = baseUrl + text;
	console.log("soon to perform a call to", url);
	http.get(url, (res) => {
		console.log("call resulted in", res);
	});

}

// this method is called when your extension is deactivated
export function deactivate() {
	textChangeDisposable.dispose();
}
