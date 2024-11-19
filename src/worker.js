const { taskQueue } = require('./queue');
const { logTaskCompletion } = require('./utils/logger');

const task = async (user_id) => {
  const timestamp = Date.now();
  console.log(`${user_id} - Task completed at ${timestamp}`);
  await logTaskCompletion({ user_id, timestamp });
};

taskQueue.process(async (job) => {
  const { user_id } = job.data;
  await task(user_id);
});
