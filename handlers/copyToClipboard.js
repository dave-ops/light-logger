const { exec } = require('child_process');

function copyToClipboard(text) {
    let cmd;
    if (process.platform === 'win32') {
        cmd = `echo ${text} | clip`;
    } else if (process.platform === 'darwin') {
        cmd = `echo "${text}" | pbcopy`;
    } else {
        cmd = `echo "${text}" | xclip -selection clipboard`;
    }

    exec(cmd, (err) => {
        if (err) {
            console.error('Failed to copy: ', err);
        } else {
            console.log('Text copied to clipboard!');
        }
    });
}

module.exports = { copyToClipboard };