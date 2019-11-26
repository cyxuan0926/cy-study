/** 
 * Woker线程也是通过监听message事件来获取主线程发来的信息 并作出反应
*/
// onmessage = function(e) {
//   console.log('UI主线程发来的数据：' + e.data);
//   const n = parseInt(e.data);
//   let sum = 0;
//   for (let i =0; i <= n; i++) {
//     sum += i;
//   }
//   console.log('结果：' + sum);
//   postMessage(sum);
// }
// onmessage = function(e) {
//   console.log('UI主线程发来的数据');
//   const sharedBuffer = e.data;
//   console.log(sharedBuffer);
// }
// let ia;
// onmessage = function(e) {
//   ia = e.data;
//   console.log(ia.length);
//   console.log(ia[37]);
//   console.log(ia[42]);
// }
// onmessage = function(e) {
//   const sharedArray = new Int32Array(e.data);
//   for (let i = 0; i < 10; i++) {
//     // const arrayValue = Atomics.load(sharedArray, i);
//     // console.log(`The item at array index ${i} is ${arrayValue}`);
//     if (i % 2 === 0) {
//       const storedValue = Atomics.store(sharedArray, i, 1);
//       console.log(`The item at array index ${i} is now ${storedValue}`); 
//     } else {
//       const exchangedValue = Atomics.exchange(sharedArray, i, 2);
//       console.log(`The item at array index ${i} was ${exchangedValue}, now 2`);
//     }
//   }
// }
onmessage = function(e) {
  // const sharedArray = new Int32Array(e.data);
  // const arrayIndex = 0;
  // const expectedStoredValue = 50;
  // console.log(Atomics.wait(sharedArray, arrayIndex, expectedStoredValue));
  // console.log(Atomics.load(sharedArray, arrayIndex));
  console.log('接收到UI线程的消息', e.data[37]);
  console.log(Atomics.wait(e.data, 37, 163));
  console.log(e.data[37]);
}