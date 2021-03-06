const hapi = require('@hapi/hapi');
const Joi = require('joi');
const { isBoom } = require('@hapi/boom');

const config = require('./libs/server/config');
const registerPlugins = require('./libs/server/register_plugins');
const registerGlobal = require('./libs/server/register_global');
const logger = require('./utils/log4js').getLogger('server');

const start = async () => {
  // 设置主进程名称
  process.env.processName = 'server';

  // 实例化一个server，并指定server的端口号
  const { server: { port } } = config;
  const server = hapi.server({ port });

  // 全局变量注册
  registerGlobal(global);

  server.validator(Joi);

  // 注册组件
  await registerPlugins(server);

  // 启动服务
  await server.start();

  // 监听response事件，捕获接口error日志
  server.ext('onPreResponse', (res, h) => {
    // 捕获服务器500错误
    if (isBoom(res.response) && res.response.output.statusCode === 500) {
      logger.error(res.response);
      const response = res.response;
      return h.response(response.output.payload).code(response.output.statusCode);
    }
    return h.continue;
  });

  logger.info(`${process.env.processName} is running at ${server.info.uri}`);
};

start();
