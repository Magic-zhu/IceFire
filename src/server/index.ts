const { ipcMain } = require('electron');
const { analyse } = require('./performance');

const registerListeners = () => {
  ipcMain.on('lighthouse', (event: any, data: any) => {
    analyse(data)
      .then((r: any) => {
        event.reply('back_lighthouse', r);
        return null;
      })
      .catch((err: any) => {
        console.log(err);
      });
  });
  ipcMain.on('open_terminal', (event: any, data: any) => {
    event.reply('','');
  });
};

export default registerListeners;
