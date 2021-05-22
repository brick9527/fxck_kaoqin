const createMongoClient = require('../../utils/mongodb');

/**
 * 每天9:00-10:00 17:30-18:30开始查询最近打卡时间
 */
async function main () {
  // 初始化数据库
  const mongoClient = await createMongoClient();
  const { User } = mongoClient.model;

  // 查询数据库获取全部要查询的人员
  const searchUsers = await User.find({ isWarningOpen: true });

  // 依次遍历（可以用并发，但是怕那边服务器顶不住）
  for (let i = 0; i < searchUsers.length; i++) {
    const user = searchUsers[i];
    /**
     * 1. 获取每个人最近一次的打卡记录
     * 2. 看看是否是当天的打卡时间
     * 3.
     */
  }
}

main();

console.log('-------');
