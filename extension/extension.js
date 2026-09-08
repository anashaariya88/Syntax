const vscode = require("vscode");

function activate(context) {
    console.log("🌱 SYNTAXX ACTIVATED!");

    const disposable = vscode.commands.registerCommand(
        "syntaxx.analyzeCode",
        () => {
            vscode.window.showInformationMessage(
                "🌱 SyntaxX is working!"
            );
        }
    );

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};