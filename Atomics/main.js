const worker = new Worker('worker.js');
// // To be shared
// const sharedBuffer = new SharedArrayBuffer(10 * Int32Array.BYTES_PER_ELEMENT) // 40个字节
// //  share sharedBuffer with the worker
// worker.postMessage({ sharedBuffer });
// // Local only
// const sharedArray = new Int32Array(sharedBuffer); // 10个元素
// console.log('notifying...');
// Atomics.store(sharedArray, 0, 123);
const sharedBuffer = new SharedArrayBuffer(1 * Int32Array.BYTES_PER_ELEMENT);
const sharedArray = new Int32Array(sharedBuffer);
Lock.initialize(sharedArray, 0);
const lock = new Lock(sharedArray, 0);
lock.lock();
try {
  worker.postMessage({ sharedBuffer });
}catch {
  worker.postMessage({ sharedBuffer }, [sharedBuffer]);
}
unlock.onclick = function(e) {
  e.preventDefault();
  lock.unlock();
}