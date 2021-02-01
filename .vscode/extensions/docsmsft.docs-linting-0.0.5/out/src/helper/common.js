"use strict";
'use-strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showWarningMessage = exports.showStatusMessage = exports.checkExtension = exports.generateTimestamp = exports.output = void 0;
const vscode = require("vscode");
exports.output = vscode.window.createOutputChannel('docs-linting');
/**
 * Create timestamp
 */
function generateTimestamp() {
    const date = new Date(Date.now());
    return {
        msDateValue: date.toLocaleDateString('en-us'),
        msTimeValue: date.toLocaleTimeString([], { hour12: false })
    };
}
exports.generateTimestamp = generateTimestamp;
/**
 * Check for active extensions
 */
function checkExtension(extensionName, notInstalledMessage) {
    const extensionValue = vscode.extensions.getExtension(extensionName);
    if (!extensionValue) {
        if (notInstalledMessage) {
            exports.output.appendLine(notInstalledMessage);
        }
        return false;
    }
    return extensionValue.isActive;
}
exports.checkExtension = checkExtension;
/**
 * Output message with timestamp
 * @param message
 */
function showStatusMessage(message) {
    const { msTimeValue } = generateTimestamp();
    exports.output.appendLine(`[${msTimeValue}] - ${message}`);
}
exports.showStatusMessage = showStatusMessage;
/**
 * Create a posted error message and applies the message to the log
 * @param {string} message - the message to post to the editor as an error.
 */
function showWarningMessage(message) {
    return __awaiter(this, void 0, void 0, function* () {
        vscode.window.showWarningMessage(message);
    });
}
exports.showWarningMessage = showWarningMessage;
//# sourceMappingURL=common.js.map