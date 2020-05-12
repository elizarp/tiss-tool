'use strict';

import { commands, Uri } from 'vscode';
/* ┌───────────┐
   │ Changelog │
   └───────────┘ */

export function getNewFeatureMsg(version: string) {
	/*TODO
	switch (version) {
        case '1.3.0':
            return localize("1.3.0 msg");
        
    }*/
	return undefined;
}

export function showChangelog() {
	commands.executeCommand('vscode.open', Uri.parse('https://github.com/elizarp/tiss-tool/blob/master/CHANGELOG.md'));
}