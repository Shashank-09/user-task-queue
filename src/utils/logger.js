const fs = require('fs-extra');
const path = require('path');

const logFile = path.join(__dirname, '../../logs/tasks.log');

const logTaskCompletion = async (logData) => {
  const logEntry = `${logData.user_id} - Task completed at ${new Date(logData.timestamp).toISOString()}\n`;
  await fs.appendFile(logFile, logEntry);
};

module.exports = { logTaskCompletion };
