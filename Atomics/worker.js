// 接受一个共享数组缓冲区
// worker线程中的全局对象为self 代表子线程自身
// self.onmessage = function(e) {
//   const { sharedBuffer } = e.data;
//   const sharedArray = new Int32Array(sharedBuffer);
//   while (Atomics.load(sharedArray, 0) !== 123);
//   console.log('notified');
// }
self.onmessage = function(e) {
  const { sharedBuffer } = e.data;
  const lock = new lock(new Int32Array(sharedBuffer), 0);
  self.postMessage('Waiting for lock...');
  lock.lock();
  self.postMessage('Unlocked');
}