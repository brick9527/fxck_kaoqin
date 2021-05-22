const registerRoutes = require('./register_routes');
const scheduleCrawler = require('../../plugins/process/schedule_crawler');

module.exports = async function (server) {
  // 注册定时爬虫进程
  await server.register(scheduleCrawler);

  // 注册路由
  await registerRoutes(server);
};
