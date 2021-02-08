const { ipcMain } = require('electron');
const { analyse } = require('./performance');

const registeListeners = () => {
  ipcMain.on('lighthouse', (event: any, data: any) => {
    analyse(data).then((r: any) => {
      event.reply('back_lighthouse', r);
    });
  });
};

export default registeListeners;
