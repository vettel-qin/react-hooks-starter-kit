type TaskFn<T> = (options?: any) => Promise<T> | T;
interface TaskScript<T> {
  default: TaskFn<T>;
}

/**
 * Formatting time
 */
function format(time: Date) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

/**
 * Running task
 */
function run<T = void>(fn: TaskFn<T> | TaskScript<T>, options?: any) {
  const task = typeof fn === 'function' ? fn : fn.default;
  const start = new Date();
  console.info(`[${format(start)}] Starting '${task.name}'...`);

  return Promise.resolve(options)
    .then(task)
    .then(resolution => {
      const end = new Date();
      const time = end.getTime() - start.getTime();
      console.info(`[${format(end)}] Finished '${task.name}' after ${time} ms`);
      return resolution;
    });
}

export default run;
