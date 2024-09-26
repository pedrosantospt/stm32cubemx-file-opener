import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// Function to get the default STM32CubeMX path based on the operating system
function getDefaultSTM32CubeMXPath(): string | null {
    const platformPaths = {
        win32: "C:\\Program Files\\STMicroelectronics\\STM32Cube\\STM32CubeMX\\STM32CubeMX.exe",
        darwin: "/Applications/STM32CubeMX.app/Contents/MacOS/STM32CubeMX",
        linux: path.join(process.env.HOME || '', 'STM32CubeMX', 'STM32CubeMX') // Dynamic Linux path based on the user's home directory
    };

    const defaultPath = platformPaths[process.platform as keyof typeof platformPaths];
    return defaultPath && fs.existsSync(defaultPath) ? defaultPath : null;
}

// Function to get the STM32CubeMX path from the configuration
function getConfiguredSTM32CubeMXPath(): string | null {
    const configPath = vscode.workspace.getConfiguration().get<string>('stm32cubemx.path');
    return configPath && fs.existsSync(configPath) ? configPath : null;
}

// Function to find STM32CubeMX path either automatically or through configuration
function findSTM32CubeMXPath(): string | null {
    return getConfiguredSTM32CubeMXPath() || getDefaultSTM32CubeMXPath();
}

// Function to open STM32CubeMX with the selected file
function openSTM32CubeMX(filePath: string, cubeMXPath: string): void {
    exec(`"${cubeMXPath}" "${filePath}"`, (err, stdout, stderr) => {
        if (err) {
            vscode.window.showErrorMessage(`Error opening STM32CubeMX: ${stderr}`);
        } else {
            vscode.window.showInformationMessage(`Opened ${filePath} in STM32CubeMX`);
        }
    });
}

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('extension.openInCubeMX', (uri: vscode.Uri) => {
        const filePath = uri.fsPath;
        const cubeMXPath = findSTM32CubeMXPath();

        if (!cubeMXPath) {
            vscode.window.showErrorMessage(
                'STM32CubeMX path not found. Please set the path in the extension settings.',
                'Open Settings'
            ).then(selection => {
                if (selection === 'Open Settings') {
                    // Open the settings for this extension directly
                    vscode.commands.executeCommand('workbench.action.openSettings', '@ext:PedroSantos.stm32cubemx-file-opener');
                }
            });
            return;
        }

        openSTM32CubeMX(filePath, cubeMXPath);
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
