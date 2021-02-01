'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = exports.extensionPath = void 0;
const lint_config_controller_1 = require("./controllers/lint-config-controller");
const common_1 = require("./helper/common");
/**
 * Provides the commands to the extension. This method is called when extension is activated.
 * Extension is activated the very first time the command is executed.
 * preview commands -
 * formatting commands -
 *
 * param {vscode.ExtensionContext} the context the extension runs in, provided by vscode on activation of the extension.
 */
function activate(context) {
    exports.extensionPath = context.extensionPath;
    const { msTimeValue } = common_1.generateTimestamp();
    common_1.output.appendLine(`[${msTimeValue}] - Activating docs linting extension.`);
    // Markdownlint custom rule check
    lint_config_controller_1.checkMarkdownlintCustomProperty();
    // Update markdownlint.config to fix MD025 issue
    lint_config_controller_1.addFrontMatterTitle();
    // Update markdownlint.config to remove MD028 rule
    lint_config_controller_1.removeBlankLineInsideBlockQuote();
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
    common_1.output.appendLine('Deactivating docs-linting extension.');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map