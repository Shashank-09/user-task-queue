const cluster = require('cluster');
const os = require('os');
const express = require('express');
const taskRoutes = require('./routes/taskRoutes');

if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`);

  const numWorkers = os.cpus().length;
  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died. Starting a new worker...`);
    cluster.fork();
  });
} else {
  const app = express();
  app.use(express.json());
  app.use('/api/tasks', taskRoutes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} is running on port ${PORT}`);
  });
}
