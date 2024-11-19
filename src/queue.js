const Queue = require('bull');

const taskQueue = new Queue('tasks', {
  redis: { host: '127.0.0.1', port: 6379 },
});

// Process the queue
taskQueue.process(async (job) => {
  const { user_id } = job.data;
  await task(user_id);
});

const addTaskToQueue = (user_id) => {
  return taskQueue.add({ user_id });
};

taskQueue.on('active', (job) => {
  taskQueue.rateLimit = {
    max: 1,
    duration: 1000,
    groupKey: 'user_id',
  };
});

module.exports = { taskQueue, addTaskToQueue };
