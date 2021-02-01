'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMarkdownlintCustomProperty = exports.addFrontMatterTitle = exports.removeBlankLineInsideBlockQuote = void 0;
const vscode_1 = require("vscode");
const common_1 = require("../helper/common");
// store users markdownlint settings on activation
const markdownlintProperty = 'markdownlint.config';
function removeBlankLineInsideBlockQuote() {
    const markdownlintData = vscode_1.workspace.getConfiguration().inspect(markdownlintProperty);
    // preserve existing markdownlint.config settings if they exist
    if (markdownlintData.globalValue) {
        const existingUserSettings = markdownlintData.globalValue;
        Object.assign(existingUserSettings, { MD028: false });
        vscode_1.workspace
            .getConfiguration()
            .update(markdownlintProperty, existingUserSettings, vscode_1.ConfigurationTarget.Global);
        common_1.showStatusMessage(`disabled MD028 rule in Markdownlint config setting.`);
    }
    // add md028 property and front_matter_title property directly (no existing settings)
    if (!markdownlintData.globalValue) {
        const blankLineInsideBlockQuoterParameter = { MD028: false };
        vscode_1.workspace
            .getConfiguration()
            .update(markdownlintProperty, blankLineInsideBlockQuoterParameter, vscode_1.ConfigurationTarget.Global);
        common_1.showStatusMessage(`disabled MD028 rule in Markdownlint config setting.`);
    }
}
exports.removeBlankLineInsideBlockQuote = removeBlankLineInsideBlockQuote;
function addFrontMatterTitle() {
    const markdownlintData = vscode_1.workspace.getConfiguration().inspect(markdownlintProperty);
    const addFrontMatterTitleSetting = vscode_1.workspace.getConfiguration('markdown').addFrontMatterTitle;
    // preserve existing markdownlint.config settings if they exist
    if (markdownlintData.globalValue && addFrontMatterTitleSetting) {
        const existingUserSettings = markdownlintData.globalValue;
        Object.assign(existingUserSettings, { MD025: { front_matter_title: '' } });
        vscode_1.workspace
            .getConfiguration()
            .update(markdownlintProperty, existingUserSettings, vscode_1.ConfigurationTarget.Global);
        common_1.showStatusMessage(`Added front_matter_title property to Markdownlint config setting.`);
    }
    // add md025 property and front_matter_title property directly (no existing settings)
    if (!markdownlintData.globalValue && addFrontMatterTitleSetting) {
        const frontMatterParameter = { MD025: { front_matter_title: '' } };
        vscode_1.workspace
            .getConfiguration()
            .update(markdownlintProperty, frontMatterParameter, vscode_1.ConfigurationTarget.Global);
        common_1.showStatusMessage(`Added front_matter_title property to Markdownlint config setting.`);
    }
    // let user know that markdownlint.config file will not be updated
    if (!addFrontMatterTitleSetting) {
        common_1.showStatusMessage(`The addFrontMatterTitleSetting value is set to false.  MD025 rule will not be updated.`);
    }
}
exports.addFrontMatterTitle = addFrontMatterTitle;
/**
 * Method to check for the docs custom markdownlint value.
 * Checks for markdownlint.customRules property.  If markdownlint isn't installed, do nothing.  If markdownlint is installed, check for custom property values.
 */
function checkMarkdownlintCustomProperty() {
    const { msTimeValue } = common_1.generateTimestamp();
    const customProperty = 'markdownlint.customRules';
    const customRuleset = '{docsmsft.docs-linting}/markdownlint-custom-rules/rules.js';
    const docsMarkdownRuleset = '{docsmsft.docs-markdown}/markdownlint-custom-rules/rules.js';
    const customPropertyData = vscode_1.workspace.getConfiguration().inspect(customProperty);
    // new list for string comparison and updating.
    const existingUserSettings = [];
    if (customPropertyData) {
        // if the markdownlint.customRules property exists, pull the global values (user settings) into a string.
        if (customPropertyData.globalValue) {
            const valuesToString = customPropertyData.globalValue.toString();
            let individualValues = valuesToString.split(',');
            individualValues.forEach((setting) => {
                if (setting === customRuleset) {
                    existingUserSettings.push(setting);
                }
            });
            // if the customRuleset already exist, write a notification to the output window and continue.
            if (existingUserSettings.indexOf(customRuleset) > -1) {
                common_1.output.appendLine(`[${msTimeValue}] - Docs custom markdownlint ruleset is already set at a global level.`);
            }
            else {
                // if the customRuleset does not exists, append it to the other values in the list if there are any or add it as the only value.
                existingUserSettings.push(customRuleset);
                // update the user settings with new/updated values and notify user.
                // if a user has specific workspace settings for customRules, vscode will use those. this is done so we don't override non-docs repos.
                vscode_1.workspace
                    .getConfiguration()
                    .update(customProperty, existingUserSettings, vscode_1.ConfigurationTarget.Global);
                common_1.output.appendLine(`[${msTimeValue}] - Docs custom markdownlint ruleset added to user settings.`);
            }
            // remove docs-markdown ruleset setting if necessary
            if (individualValues.indexOf(docsMarkdownRuleset) > -1) {
                individualValues = existingUserSettings.filter(userSetting => {
                    return userSetting !== docsMarkdownRuleset;
                });
                vscode_1.workspace
                    .getConfiguration()
                    .update(customProperty, individualValues, vscode_1.ConfigurationTarget.Global);
                common_1.output.appendLine(`[${msTimeValue}] - docs-markdown custom markdownlint ruleset removed from user settings.`);
            }
        }
        // if no custom rules exist, create array and add docs custom ruleset.
        if (customPropertyData.globalValue === undefined) {
            const customPropertyValue = [customRuleset];
            vscode_1.workspace
                .getConfiguration()
                .update(customProperty, customPropertyValue, vscode_1.ConfigurationTarget.Global);
            common_1.output.appendLine(`[${msTimeValue}] - Docs custom markdownlint ruleset added to user settings.`);
        }
    }
}
exports.checkMarkdownlintCustomProperty = checkMarkdownlintCustomProperty;
//# sourceMappingURL=lint-config-controller.js.map