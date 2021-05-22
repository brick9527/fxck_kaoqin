const path = require('path');

const ProcessFactory = require('../../libs/process/process_factory');

module.exports = {
  name: 'scheduleCrawler',
  register: async function (server, options) {
    const scheduleCrawler = new ProcessFactory({
      processName: 'scheduleCrawler',
      main: path.join(__dirname, '../../process/test.js'),
    });
    scheduleCrawler.run();
  }
};
