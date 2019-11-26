#!/usr/bin/env node
/**
 * 异步遍历器：
 *  1.同步遍历器的问题:
 *    iterator里面next()方法只能包含同步操作，假如有异步操作的话 就是把next()方法返回值的value属性是一个Thunk函数或者Promise对象 等到以后返回真正的值 而done属性还是同步产生的
 *    function idMaker() {
        let index = 0;
        return {
          next() {
            return {
            value: new Promise(resolve => setTimeout(() => resolve(index++)), 1000),
            done: false
            }
          }
        }
      };
      const it = idMaker();
      it.next().value.then(o => console.log(o));
      it.next().value.then(o => console.log(o));
      it.next().value.then(o => console.log(o));
    2.异步遍历接口(ES2018引入的 Async Iterator)：为异步操作提供原生的遍历器接口，即value和done这两个属性都是异步产生
      异步遍历器的最大的语法特点就是调用遍历器的next方法 返回的是一个Promise对象 asyncIterator.next().then(({ value, done }) => {}),调用next方法 返回一个Promise对象 这个Promise对象的状态变为resolve以后的回调函数的参数
      则是一个具有value和done两个属性的对象 这个和同步遍历器是一样的；同步遍历器部署在Symbol.iterator属性上面 异步的遍历器接口 部署在Symbol.asyncIterator属性上面
      注：异步遍历器的next方法是可以连续调用 不必等上一步产生的Promise对象resolve以后再调用 这种情况下 next 方法会积累起来 自动按照每一步的顺序运行下去
    3.for await...of循环:用于遍历异步的Iterator接口
      for await (const x of createAsyncIterable());如果next方法返回的Promise对象被reject for await...of就会报错 要用try...catch捕获
      async function s() {
        try {
        for await (const x of createAsyncIterable()) {
          console.log(x);
          }
        }
        catch(err) {
          throw err;
        }
      }
      注：for await...of也可以用于同步遍历器
      (async function() {
        for await(const x of ['a', 'b']) {
          console.log(x)
        }
      })();
    4.异步Generator函数：返回一个异步遍历器对象，在语法上异步Generator函数就是async函数和Generator函数的结合,异步Generator函数返回值是一个异步Iterator 即每次调用
      它的next方法 会返回一个Promise对象 也就是说 跟在yield命令后面的 应该是一个Promise对象
      async function *gen() {
        yield 'hello';
      }
      const genObj = gen();
      genObj.next().then(console.log)
      async function *asyncGenerator() {
      throw new Error('Problem');
      }

      asyncGenerator().next().then(() => {}, err => {
        console.log(err)
      })
      注:普通的async函数返回的是一个Promise对象 而异步的Generator函数返回的是一个异步Iterator对象 前者自带执行器 后者通过for await...of执行 或者自己编写执行器;
      同步的数据结构 也可以使用异步Generator函数
      5.yield* 语句：也可以跟一个异步遍历器,后面是一个异步遍历器 Generator函数生成的遍历器
        async function *gen1() {
          yield 'a';
          yield 'b';
          return 2;
        }

        async function *gen2() {
          const result = yield* gen1();
          console.log(result);
        }

        let a = gen2();

        // a.next().then(val => {
        //   console.log(0, val)
        //   return a.next()
        // }).then(val1 => {
        //   console.log(1, val1)
        // })

        (async function() {
          for await(const x of gen2()) {
            console.log(x);
          }
        })();
  ArratBuffer:
    ArrayBuffer对象、TypedArray视图和DataView视图是JavaScript操作二进制数据的一个接口，它们都是以数组的语法处理二进制数据 所有统称为二进制数组；
    原始设计目的 与WebGL项目有关 所谓WebGl 就是浏览器与显卡之间的通信接口，为了满足 JavaScript 与显卡之间大量的、实时的数据交换，它们之间的数据通信必须是二进制的
    而不能是传统的文本格式。文本格式传递一个 32 位整数，两端的 JavaScript 脚本与显卡都要进行格式转化，将非常耗时。允许开发者以数组下标的形式 直接操作内存 大大增强了
    JavaScript处理二进制数据的能力 使得开发者有可能通过JavaScript与操作系统的原生接口进行二进制通信
    直接操作字节 4个字节32位整数 以二进制形式原封不动地送入显卡 脚本的性能就会大幅提升
    二进制数组由三类对象组成：
      1.ArrayBuffer对象：代表内存之中地一段二进制数据 可以通过'视图'进行操作。'视图'部署了数组接口 可以用数组的方法操作内存
      2.TypeArray视图：共包括9中类型的视图 比如 Uint8Array(无符号8位整数) Int16Array(16位整数) Float32Array(32位浮点数)
      3.DataView视图：可以自定义复合格式的视图 比如第一个字节是Uint8 第二 三字节是Int16 第四字节是Float32.此外还可以自定义字节序
    简单来说 ArrayBuffer对象代表原始的二进制数据 TypedArray代表的用来读写简单类型的二进制数据 DataView视图用来读写复杂类型的二进制数据
    注：二进制数组并不是真正的数组 而是类似数组的对象
    1.ArrayBuffer对象：
      代表存储二进制数据的一段内存，它不能直接读写 只能通过视图(TypedArray 和 DataView)来读写 视图的作用是以指定格式解读二进制数据；ArrayBuffer也是一个构造函数 可以分配
      一段可以存放数据的连续内存区域;ArrayBuffer构造函数的参数是所需要的内存大小(单位字节)每个字节的值默认都是0;TypedArray视图 和DataView视图的一个区别是 它不是一个构造函数
      而是一组构造函数 代表不同的数据格式;TypedArray 除了接受ArrayBuffer实例作为参数 还可以接受普通的数组作为参数，直接分配内存生成底层的ArrayBuffer实例 并同时完成对这段内存的赋值
      字节数(byte)/位数(bit)
    2.TypedArray视图：
      1.9种类型 每一种视图都是一种构造函数，统称TypedArray视图
        Int8Array:8位有符号数 长度1字节
        Uint8Array:8位无符号整数，长度1字节
        Unit8CArray：8位无符号整数 长度1字节 溢出处理不同
        Int16Array：16位有符号整数 长度2字节
        Uint16Array：16位无符号数 长度2字节
        Int32Array：32位有符号整数 长度4字节
        Uint32Array：32位无符号整数 长度4字节
        Float32Array：32位浮点数 长度4字节
        Float64Array：64位浮点数 长度8字节
        这9个构造函数生成的数组 和普通数组很像，都要length属性 都能用方括号运算符获取单个元素 所以数组的方法 在它们上面都能使用，差异主要在下面
          TypedArray数组的所以成员都是同一种类型
          TypedArray数组的成员是连续的 不会有空位
          TypedArray数组成员默认值为0 new Array(10)返回一个普通数组，里面没有任何成员，只是 10 个空位；new Uint8Array(10)返回一个 TypedArray 数组，里面 10 个成员都是 0
          TypedArray数组只是一层视图 本身不存储数据 它的数据都存储在底层的ArrayBuffer对象之中 要获取底层对象必须使用buffer属性
      2.构造函数：
        TypedArray(buffer, byteOffset = 0, length?)
        注意：byteOffset必须与所要建立的数据类型一致 否则会报错
        TypedArray(length):视图还可以不通过ArrayBuffer对象 直接分配内存而生成
        TypedArray(TypedArray)：还可以接受另一个TypedArray实例作为参数
          注意：此时生成的新数组 只是复制了参数数组的值 对于的底层内存是不一样的 新数组会开辟一段新的内存存储数据 不会在原数组的内存之上建立视图
        TypedArray(arrayLikeObject):也可以是一个普通数组 然后直接生成TypedArray实例，这时的TypedArray视图会重新开辟内存 不会再原数组的内存上建立视图
        TypedArray数组也可以转换回普通数组；注：TypedArray数组没有concat方法；TypedArray数组与普通数组一样 部署了Iterator接口 所以可以被遍历
        字节序：数值在内存中的表示方式(x86体系的计算机都采用little endian， 相对重要的字节排在后面的内存地址 相对于不重要字节排在前面的内存地址)
        BYTES_PER_ELEMENT属性：每种视图的构造函数 都有一个BYTES_PRE_ELEMENT属性 表示这种数据类型占据的字节数，这个属性在TypedArray实例上也能获取 既有
        TypedArray.prototype.BTYES_PER_ELEMENT
      ArrayBuffer与字符串的相互转换
        使用原生的TextEncoder和TextDecoder方法
      溢出:不同的视图类型 所能容纳的数值范围是确定的，超出这个范围 就会出现溢出。TypedArray数组的溢出处理规则 简单来说 就是抛弃溢出的位 然后按照视图类型进行解释
        正向溢出(overflow)：当输入值大于当前数据类型的最大值 结果等于当前数据类型的最小值加上余值 再减去1
        负向溢出(underflow): 当输入值小于当前数据类型的最小值 结果等于当前数据类型的最大值减去余值的绝对值 再加上1
        余值：就是模运算(%)
        Uint8ClampedArray视图的溢出规则 与上面的规则不同， 它规定 凡是发生正向溢出 该值一律等于当前数据类型的最大值 即255 如果发生负向溢出 该值一律等于当前数据类型的最小值 即0
      TypedArray.prototype.buffer
        TypedArray实例的buffer属性 返回整段内存区域对应的ArrayBuffer对象 该属性为只读属性
      TypedArray.prototype.byteLength
        返回TypedArray数组占据的字节长度
        都是只读属性
      TypedArray.prototype.byteOffset
        返回TypedArray数组从底层ArrayBuffer对象的哪个字节开始
        都是只读属性
      TypedArray.prototype.length
        表示TypedArray数组含有多少个成员
      TypedArray.prototype.set()
        TypedArray数字的set方法用于复制数组(普通数组或TypedArray数组) 也就是将一段内容完全复制到另一段内存
      TypedArray.prototype.subarray
        注：这个截取的是length
        subarray方法是对于TypedArray数组的一部分 再建立一个新的视图.第一个参数是起始的成员序号 第二个参数是结束的成员序号(不包含这个成员)
      TypedArray.prototype.slice
        返回一个指定位置的新的TypedArray实例.参数表示原数组的具体位置 开始生成新数组
      TypedArray.of
        TypedArray数组的所以构造函数 都有一个静态方法of 用于将参数转为一个TypedArray实例
      TypedArray.from
        静态方法from接受一个可遍历的数据结构作为参数 返回一个基于这个结构的TypedArray实例
        这个方法还可以将一种TypedArray实例 转为另一种
        次方法还可以接受一个参数 作为第二个参数 用来对每个元素进行遍历 功能类似map方法
        本质：会将第一个参数指定的TypedArray数组 拷贝到另一段内存之中 处理之后再将结果转成指定的数组格式(这里就可能会涉及到溢出 字节序等)
      复合视图
        由于视图的构造函数可以指定起始位置和长度 所以在同一段内存之中 可以依次存放不同类型的数据 这叫做'复合视图'
    DataView视图
      如果一段数据包括多种类型(比如服务器传来的HTTP数据) 这时除了建立ArrayBuffer对象的复合视图之外 还可以通过DataView视图进行操作。DataView视图提供更多
      操作选项 而且支持设定字节序。设计是用来处理网络设备传来的数据 所以大/小端字节序。本身也是构造函数 接受一个ArrayBuffer对象作为参数 生成视图
      DataView(ArrayBuffer buffer [,字节起始位置, [,长度]])
      DataView实例提供8个字节方法读取内存(第一个参数是一个字节序号 表示从哪个字节开始读取)
        getInt8: 读取1个字节 返回一个8位整数
        getUint: 读取1一个字节 返回一个无符号的8位整数
        getInt16: 读取2个字节 返回一个16位整数
        getUint16: 读取2个字节 返回一个无符号的16位整数
        getInt32: 读取4个字节 返回一个32位整数
        getUint32: 读取4个字节 返回一个无符号的32位整数
        getFloat32: 读取4个字节 返回一个32位浮点数
        getFloat64: 读取8个字节 返回一个64位浮点数
      注：这一系列get方法的参数都是一个字节序号(不能是负数 否则会报错) 表示从哪个字节开始读取 如果一次读取两个或两个以上字节 就必须明确数据的存储方式 到底是小端字节序
      还是大端字节序。默认情况下 DataView的get方法使用大端字节序读取数据 如果需要使用小端字借序解读 必须在get方法的第二个参数指定true
      DataView视图提供8个写入内存的方法(第一个参数是字节序号 表示从哪个字节开始写入 第二个参数为写入的数据，第三个参数为字节序 true表示小端字节)
        setInt8: 写入1个字节的8位整数
        setUint8: 写入1个字节的8位无符号整数
        setInt16: 写入2个字节的16位整数
        setUint16: 写入2个字节的16位无符号整数
        setInt32: 写入4个字节的32位整数
        setUint32: 写入4个字节的32位无符号整数
        setFloat32: 写入4个字节的32位浮点数
        setFloat64: 写入8个字节的64位浮点数
        注：接受两个参数 第一个参数是字节序号 表示从哪个字节开始写入 第二个参数为写入的数据 对于两个或两个以上字节的方法 需要指定第三个参数 false或undefined表示使用大端字节序写入 true表示使用小端字节序写入]
        浮点数在计算机中的表示
          浮点数在计算机中表示较为复杂 首先需要把浮点数化为规格化数 借助规格化数来对浮点数据进行储存表示
            规格化数 = (-1)^s * 2^E * 1.f => 1位s 8位e 23位f
            s为0则表示正数 为1则表示负数
            E为阶码 反映了小数点在数据中的位置 指数e是由E转换而来 公式为e = E + 127
            f位数不够向右补0
      二进制应用
        AJAX
          XMLHTTPRequest允许服务器返回二进制数据，如果明确制定返回的二进制数据类型 可以把返回类型(responseType) 设为arrayBuffer 如果不知道 就设为Blob
        Canvas
          网页Canvas元素输出的二进制像素数据 就是TypedArray数组
        websocket
          可以通过arraybuffer 发送或接收二进制数据
        Fetch API
          其取回的数据 就是ArrayBuffer对象
        File API
          如果知道一个文件的二进制数据类型 也可以将这个文件读取为ArrayBuffer对象
          下面以处理bmp文件为例 假定file变量是一个指向bmp文件的文件对象
        SharedArrayBuffer
          web worker引入了多线程：主线程用来与用户互动 woker线程用来承担计算任务。每个线程的数据都是隔离的 通过postMessage()通信.
          线程之间的数据交换可以是各种格式 不仅仅是字符串 也可以是二进制数据。这种交换采用的是复制机制 即一个进程将需要分享的数据复制一份，通过postMessage方法交给另一个进程
          如果数据量比较大 这种通信的效率显然比较低。
          引入sharedArrayBuffer 允许Worker线程与主线程共享同一块内存.sharedArrayBuffer的API与ArrayBuffer一模一样 唯一的区别是后者无法共享数据
          sharedArrayBuffer与ArrayBuffer一样 本身是无法读写的 必须在上面建立视图 然后通过视图读写
        Atomice对象
          多线程共享内存 最大的问题就是如何防止两个线程同时修改某个地址 或者说 当一个线程修改共享内存以后 必须有一个机制让其他线程同步。sharedArrayBuffer API提供Atomics对象 保证所有共享内存的操作
          都是'原子性'的 并且可以在所有线程内同步。
          原子性操作
            一条普通的命令被编译器处理以后 会变成多条机器指令。如果是单线程运行 这是没有问题的 多线程环境并且共享内存时 就会出问题 因为这一组机器指令的运行期间 可能会插入其他线程的指令 从而导致运行结果出错 
          Atomics对象可以保证一个操作所对应的多条机器指令 一定是作为一个整体运行的 中间不会被打断 也就是说 它所涉及的操作都可以看作是原子性的单操作 这可以避免线程竞争 提高多线程共享内存时的操作安全
          Atomics.store()
            store方法用来向共享内存写入数据，Atomice.store(array, index) 也是返回sharedArray[index]的值
          Atomics.load()
            load方法用来从共享内存读出数据 Atomics.load(array, index, value) 返回sharedArray[index]的值
          Atomics.exchange()
            也是写入数据 返回被替换的值
          Atomics.wait()、Atomics.wake(): 这两个方法用于等待通知。这两个方法相当于锁内存 即一个线程进行操作时 让其他线程休眠(建立锁) 等到操作结束 再唤醒那些休眠的线程(解除锁)
          Atomics.wait(sharedArray, index, value, timeout)
            sharedArray: 共享内存的视图数组
            index: 视图数据的位置(从0开始)
            value: 该位置的预期值 一旦实际值等于预估值 就进入休眠
            timeout: 整数 表示过了这个时间以后 就自动唤醒 单位是毫秒 该参数可选 默认是 Infinity 即无期限的休眠 只有通过Atomics.wake()方法才能唤醒
            返回值是一个字符串 共有三种可能的值
              sharedArray[index]不等于 value 返回字符串not-equal 否则就进入休眠
              Atomics.wake()方法唤醒 就返回字符串ok
              如果因为超时唤醒 就返回字符串 timed-out
          Atomics.wake(sharedArray, index, count)
            sharedArray: 共享内存的视图数组
            index: 视图数据的位置(从0开始)
            count: 需要唤醒的Worker线程的数量 默认是 Infinity
            wake方法一旦唤醒休眠的Worker线程 就会壤土继续往下运行
          运算方法
            共享内存上面的某些运算是不能被打断的 即不能在运算过程中 让其他线程改写内存上面的值。Atomics对象提供了一些运算方法 防止数据被改写
            Atomics.add(sharedArray, index, value)
              用于将value加到sharedArray[index] 返回sharedArray[index]旧的值
            Atomics.sub(sharedArray, index, value)
              用于将value加到sharedArray[index] 返回sharedArray[index]旧的值
            Atomics.and(sharedArray, index, value)
              进行位运算and 并返回旧的值
            Atomics.or(sharedArray, index, value)
              进行位运算and 并返回旧的值
            Atomics.xor(sharedArray, index, value)
              进行位运算xor(异或) 并返回旧的值
 *    
 */
// const buf = new ArrayBuffer(32);
// console.log(buf);
// 已知[X]补 求[-X]补：符号位和数值位都取反 末位再加1
// const dataView = new DataView(buf); // -90:原码 ：1000000001011010 反码；1111111110100101 补码：1111111110100110
// console.log(dataView);
// console.log(Int8Array.BYTES_PER_ELEMENT); // 每个元素的字节数
// const view = new Uint16Array([1, 653, 700, -90, 88]);
// console.log(view);
// const view = new Uint16Array(8); // 传入一个数组长度值 占用的字节数 = 长度 x 该类型的 BYTES_PER_ELEMENT
// console.log(view) // TypedArray(arrayBuffer, byteOffset, length ):ArrayBuffer实例、从第几个字节开始、表示数据个数
// const arrayBuffer = new ArrayBuffer(32);
// const aView = new Int16Array(arrayBuffer, 0, 4);
// const bView = new Float32Array(arrayBuffer, 8, 5);
// const cView = new Uint8Array(arrayBuffer, 28, 8);
// console.log(aView, bView, cView);
// const arraybuffer = new ArrayBuffer(4);
// const aView = new Int8Array(arraybuffer);
// const bView = new Int8Array(arraybuffer, 2);
// aView[0] = 1;
// aView[1] = 2;
// aView[2] = 3;
// aView[3] = 4;
// bView[0] = 9;
// bView[1] = 8; 
// console.log(aView[2], aView[3]); // 两个相互重叠的视图所占据的内存空间 存在其中的值以最后一次写进去的为主
// const view = new Int8Array([1, 1228]) // 10011001100 => 11001100(补码)=>10110011(反码)=>10110100(原码) 因为在计算机中存储的是补码
// console.log(view)
// 有符号数与无符号数之间相互的转换：都要看最高位是否为1 如果不为1 则转换结果就是要转换的数的本身 如果为1 则转换结果就是转换数的补码
// const arraybuffer = new ArrayBuffer(4);
// const aView = new Int8Array(arraybuffer);
// const bView = new Int16Array(arraybuffer, 2);
// aView[0] = 1;
// aView[1] = 2;
// aView[2] = 3;
// aView[3] = 4;
// bView[0] = 500; // 111110100
// bView[1] = 8; // 在实例化视图时超出内存空间不允许 而对内存读写时超出则没有问题，不过超出的值 返回undefined
// console.log(aView[2], aView[3]); // 字节序：即字节在电脑中存放时的序列与输入(输出)时的序列是先到的在前还是后到的在前；little endian:将低序字节存储在起始地址；Big endian：将高序字节存储在起始地址
// const arraybuffer = new ArrayBuffer(8);
// const view = new Int8Array(arraybuffer);
// view.set([1,2,3],3);
// console.log(view, view.entries());
// console.log(view.buffer, view.byteLength, view.byteOffset, view.length, view.entries(), );
// Base64编码：一种基于用64个可打印字符来表示二进制数据的表示方法
// const buffer = new ArrayBuffer(12);
// // const x1 = new Int32Array(buffer);
// const x1 = new Uint32Array(buffer);
// const x2 = new Uint8Array(buffer);
// x2[0] = 1;
// x2[1] = 2;
// x2[3] = 3;
// x2[4] = 4;
// x1[0] = 62300; // 00000000 00000000 11110011 01011100 => 01011100(92) 11110011(243) 00000000 00000000
// console.log(x1, x2);
// TypedArray视图的构造函数 除了接受ArrayBuffer实例作为参数 还可以接受普通数组作为参数 直接分配内存生成底层的ArrayBuffer实例 并同时完成对这段内存的赋值
// const typedArray = new Uint8Array([0, 1, 2]);
// console.log(typedArray.length);
// typedArray[0] = 5;
// console.log(typedArray);
// ArrayBuffer.prototype.byteLength:ArrayBuffer实例的byteLength属性 返回所分配的内存区域的字节长度;如果要分配的内存区域很大 有可能分配失败 所以必须有必要检查是否分配成功
// const buffer = new ArrayBuffer(32);
// console.log(buffer.byteLength);
// ArrayBuffer.prototype.slice():允许将内存区域的一部分 拷贝生成一个新的ArrayBuffer对象；slice():第一步先是分配一段新内存 第二步是将原来那个ArrayBuffer对象拷贝过去;除了slice方法 
// ArrayBuffer对象不提供任何直接读写内存的方法 只允许建立视图 通过视图读写
// const buffer = new ArrayBuffer(8);
// const newBuffer = buffer.slice(0, 3);
// console.log(buffer, newBuffer);
// ArrayBuffer.isView():静态方法isView 返回一个布尔值 表示参数是否位ArrayBuffer的视图实例
// const buffer = new ArrayBuffer(8);
// const v = new Uint8Array(buffer);
// console.log(ArrayBuffer.isView(buffer), ArrayBuffer.isView(v));
// TypedArray视图：ArrayBuffer对象作为内存区域 可以存放多种类型的数据 同一段内存 不同数据有不同的解读方式 这就叫做'视图'(view)
// TypedArray:数组成员都是同一个数据类型 DataView:可以是不同的数据类型
// const b = new ArrayBuffer(8);
// const v1 = new Int32Array(b); // [0, 0]
// const v2 = new Uint8Array(b, 2); // [0,0,0,0,0,0]
// const v3 = new Int16Array(b, 2, 2); // [0, 0]
// console.log(v1, v2, v3);
// const f64a = new Float64Array(8);
// console.log(f64a.BYTES_PER_ELEMENT);
// const typedArray = new Int8Array(new Uint8Array(4));
// console.log(typedArray.byteLength);
// const x = new Int8Array([1, 1]);
// const y = new Int8Array(x);
// console.log(x[0], y[0]);
// x[0] = 2;
// console.log(x[0], y[0]);
// 如果想基于同一段内存 构造不同的视图 可以采用下面的写法
// const x = new Uint8Array([1, 1]);
// const y = new Uint8Array(x.buffer);
// x[0] = 2
// console.log(x[0], y[0]);
// const typedArray = new Uint8Array([1, 2])
// const normalArray01 = [...typedArray]
// const normalArray02 = Array.from(typedArray)
// const normalArray03 = Array.prototype.slice.call(typedArray)
// const buffer = new ArrayBuffer(16);
// const int32View = new Int32Array(buffer); // [0, 2, 4, 6]0010
// for(let i = 0; i < int32View.length; i++) {
//   int32View[i] = i * 2;
// }
// const int16View = new Int16Array(buffer); // [,,,,,,,,]
// for(let i = 0; i <int16View.length; i++ ) {
//   console.log('Entry ' + i + ": " + int16View[i]);
//   // [0,0,2,0,4,0,6,0]
// }
// const buffer = new ArrayBuffer(4);
// const v1 = new Uint8Array(buffer); // 8位 一个字节
// v1[0] = 2;
// v1[1] = 1;
// v1[2] = 3;
// v1[3] = 7;
// const uInt16View = new Uint16Array(buffer); // 16位 2个字节 0000000100000010 0000011100000011
// if (uInt16View[0] === 258) {
//   console.log('OK');
// }
// uInt16View[0] = 255 // 1 2 4 8 16 32 64 128 //255 1111111100000000// FF 00 
// const test = new Int32Array(3)
// console.log(Uint16Array.BYTES_PER_ELEMENT, test.BYTES_PER_ELEMENT)
// const uint8 = new Uint8Array(1);
// uint8[0] = 256 // 10000000
// uint8[0] = -1; // 100000001 => 111111110 => 111111111
// console.log(uint8);
// const init8 = new Int8Array(1); // -128 ~ 127
// init8[0] = 128; // -128 + 1 -1 = -128 
// init8[0] = -129 // 127 - 1 + 1 = 127
// const uint8c = new Uint8ClampedArray(1);
// uint8c[0] = 256;
// console.log(uint8c[0])
// const a = new Float32Array(64);
// console.log(a.buffer)
// const b = new ArrayBuffer(8); // 总共8个字节
// const v1 = new Int32Array(b); // 8 0
// const v2 = new Uint8Array(b, 2); // 6 2 
// const v3 = new Int16Array(b,2,2); // 4 2
// console.log(v1.byteLength, v2.byteLength, v3.byteLength, v1.byteOffset, v2.byteOffset, v3.byteOffset);
// const a = new Int16Array(8); // 8 x 2 = 16个字节
// console.log(a, a.length,a.byteLength);
// const a = new Uint8Array(8);
// const b = new Uint8Array(8);
// b.set(a);
// b[0] = 1;
// console.log(a, b);
// const a = new Uint16Array(8); // 8 X 2 = 16
// const b = a.subarray(2, 3); // 1 X 2 = 2
// console.log(a.byteLength, b.byteLength);
// let ui8 = Uint8Array.of(0,1,2);
// console.log(ui8);
// console.log(ui8.slice(-1))
// console.log(Float32Array.of(0.151, -8, 3.7))
// console.log(Uint16Array.from([1,2,3]))
// Int16Array.from(Int8Array.of(127, 126, 125), x => {
//   console.log(x * 2);
// })
// const buffer = new ArrayBuffer(24); // 24个字节
// const idView = new Uint32Array(buffer, 0, 1); // 一个成员4字节 不偏移 1一个成员长度 4个字节
// const usernameView = new Uint8Array(buffer, 4, 16); // 一个成员1个字节 偏移4个字节 16个成员 16个字节
// const amountDueView = new Float32Array(buffer, 20, 1); // 一个成员4个字节 偏移20个字节 1个成员 4个字节
// console.log(idView, usernameView, amountDueView)
// const buffer = new ArrayBuffer(24); // 24字节
// const dv = new DataView(buffer); // DataView视图
// const v1 = dv.getUint8(0); // 从第0个字节开始读取 读取全部 0
// const v2 = dv.getUint16(1); // 从第1个字节开始读取 2个字节 1个数据 1~2
// const v3 = dv.getUint16(3); // 从第三个字节开始读取 2个字节 3~4
// console.log(v1, v2, v3);
// const v1 = dv.getUint16(1, true); // 小端
// const v2 = dv.getUint16(3, false); // 大端
// const v3 = dv.getUint16(3); // 大端
// dv.setInt32(0, 25, false) // 大端字节序 0号开始  000000000000000000000000000011001 => 000000000000000000000000000011001
// console.log(dv.getInt8(3)); // 默认是大端字节序 然后计算机中的存储大部分是小端字节序 这也符合逻辑 读取出来的东西就是我们实际要的东西 不需要转换了
// dv.setFloat32(8, 2.5, true) // 小端字节序 第8个字节开始 10 1 10.0 = 1.01 * (-1)^0 * 2^1 s = 0 E = 1 e = 127+1=128  01000000 00100000 00000000 00000000 => 00000000 00000000 00100000 01000000
// console.log(dv.getUint8(8), dv.getUint8(9), dv.getUint8(10), dv.getUint8(11))
//  50.0 =>  110010.0B = (-1) ^ 0 * 1.100100 * 2 ^ 5 s = 0 E = 5  f= 0.100100 e = 127 + 5 =132   10000100 = 4 + 128 = 132 01000010010010000000000000000000
// let xhr = new XMLHttpRequest();
// xhr.open('GET', someUrl);
// xhr.responseType = 'arraybuffer';
// xhr.onload = function() {
//   let arrayBuffer = xhr.response;
// };
// xhr.onreadystatechange = function(req) {
//   if (req.readyState === 4) {
//     const arrayResponse = xhr.response;
//     const dataView = new DataView(arrayResponse);
//     const ints = new Uint32Array(dataView.byteLength / 4);
//     xhrDiv.style.backgroundColor = "#00FF00";
//     xhrDiv.innerText = "Array is " + ints.length + "uints long";
//   }
// }
// xhr.send();
// const canvas = document.getElementById('myCanvas');
// const ctx = canvas.getContext('2d');
// const imageData = ctx.getImageData(0,0,canvas.clientWidth, canvas.height);
// const uint8ClapmedArray = imageData.data;
// let socket = new WebSocket('ws://127.0.0.1:8081');
// socket.binaryType = 'arraybuffer';
// // socket.addEventListener('open', function(event) {
// //   const typedArray = new Uint8Array(4);
// //   console.log(typedArray);
// //   socket.send(typedArray.buffer);
// // });
// socket.addEventListener('message', function(e) {
//   const arrayBuffer = e.data;
//   console.log('接收', arrayBuffer)
// })
// fetch(url).then(response => {
//   return response.arrayBuffer()
// }).then(arrayBuffer => {
//   console.log(arrayBuffer);
// })
// const fileInput = document.getElementById('fileInput');
// const file = fileInput[0];
// const reader = new FileReader();
// reader.readAsArrayBuffer(file);
// reader.onload = function() {
//   const arrayBuffer = reader.result;
// }
// const reader = new FileReader();
// reader.addEventListener('load', processimage, false);
// reader.readAsArrayBuffer(file);
// function processimage(e) {
//   const buffer = e.target.result;
//   const datav = new DataView(buffer);
//   const bitmap = {};
//   // 具体处理图像数据时 先处理bmp的文件头
//   bitmap.fileheader = {};
//   bitmap.fileheader.bfType = datav.getUint16(0, true);
//   bitmap.fileheader.bfSize = datav.getUint32(2, true);
//   bitmap.fileheader.bfReserved1 = datav.getUint16(6, true);
//   bitmap.fileheader.bfReserved2 = datav.getUint16(8, true);
//   bitmap.fileheader.bfOffBits = datav.getUint32(10, true);
//   // 接着处理图像元信息部分
//   bitmap.infoheader = {};
//   bitmap.infoheader.biSize = datav.getUint32(14, true);
//   bitmap.infoheader.biWidth = datav.getUint32(18, true);
//   bitmap.infoheader.biHeight = datav.getUint32(22, true);
//   bitmap.infoheader.biPlanes = datav.getUint16(26, true);
//   bitmap.infoheader.biBitCount = datav.getUint16(28, true);
//   bitmap.infoheader.biCompression = datav.getUint32(30, true);
//   bitmap.infoheader.biSizeImage = datav.getUint32(34, true);
//   bitmap.infoheader.biXPelsPerMeter = datav.getUint32(38, true);
//   bitmap.infoheader.biYPelsPerMeter = datav.getUint32(42, true);
//   bitmap.infoheader.biClrUsed = datav.getUint32(46, true);
//   bitmap.infoheader.biClrImportant = datav.getUint32(50, true);
//   // 最后处理图像本身的像素信息
//   const start = bitmap.fileheader.bfOffBits;
//   bitmap.pixels = new Uint8Array(buffer, start);
// }
/** 
 * sharedArrayBuffer：允许共享同一块内存
 * Atomics(原子性操作)：
 *  store(array, index, value): 允许向共享内存写入数据。保证该位置的赋值操作 一定是在它前面的所有可能会改写成内存的操作结束后执行 返回array[index]
 *  load(array, index): 从共享内存读出数据 而该位置的取值操作 一定是在它后面所有可能会读取该位置的操作开始之前执行 返回 array[index]
 *  exchange(array, index, value): 写入数据和store一样 只是其返回的是被替换的值
 *  wait(sharedArray, index, value, timeout[Infinity]): 建立锁,锁住内存,让其他线程休眠
 *  wake(sharedArray, index, count[Infinity]): 解除锁 唤醒那些休眠的线程
 *共享内存上面的某些运算是不能被打断的 即不能在运算过程中 让其他线程改写的内存上面的值
    Atomics.add(sharedArray, index, value): 返回sharedArray[index]旧的值
    Atomics.sub(sharedArray, index, value): 返回sharedArray[index]旧的值
    Atomics.and(sharedArray, index, value): 与运算 返回旧的值
    Atomics.or(sharedArray, index, value): 或运算 返回旧的值
    Atomics.xor(sharedArray, index, value)：异或运算 返回旧的值
    Atomics.compareExchange(sharedArray, index, oldVal, newVal): 如果sharedArray[index]等于oldVal, 就写入newVal 返回oldVal
*/