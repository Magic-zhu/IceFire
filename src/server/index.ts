const { ipcMain } = require('electron');
const { analyse } = require('./performance');

const registeListeners = () => {
  ipcMain.on('lighthouse', (event: any, data: any) => {
    analyse(data).then((r: any) => {
      event.reply('back_lighthouse', r);
      return null
    })
    .catch((err:any)=>{
      console.log(err);
    });
  });
};

export default registeListeners;
