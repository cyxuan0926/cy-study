const UNLOCKED = 0; // 不上锁
const LOCKED_NO_WAITERS = 1; // locked_no_waiters:
const LOCKED_POSSIBLE_WAITERS = 2; // locked_possible_waiters；
const NUMINTS = 1; // Number of shared Int32 locations needed by the lock
class Lock {
  constructor(iab, ibase) {
    this.iab = iab;
    this.ibase = ibase;
  }
  // 上锁
  lock() {
    const iab = this.iab;
    const stateIdx = this.ibase;
    var c;
    if ((c = Atomics.compareExchange(iab, stateIdx, UNLOCKED, LOCKED_NO_WAITERS)) !== UNLOCKED) { // iab的stateIdx的原始值不等于0 既当前位置是不上锁状态 假如iab[stateIdx] === 0 => iab[stateIdx] = 1;
      do {
        if (c === LOCKED_NO_WAITERS || Atomics.compareExchange(iab, stateIdx, LOCKED_NO_WAITERS, LOCKED_POSSIBLE_WAITERS) !== UNLOCKED) { // 
          Atomics.wait(iab, stateIdx, LOCKED_POSSIBLE_WAITERS, Number.POSITIVE_INFINITY); // 这里是上锁
        }
      } while((c = Atomics.compareExchange(iab, stateIdx, UNLOCKED, LOCKED_POSSIBLE_WAITERS)) !== UNLOCKED); //
    }
  }
  // 解锁
  unlock() {
    const iab = this.iab;
    const stateIdx = this.stateIdx;
    var v0 = Atomics.sub(iab, stateIdx, 1);
    if (v0 !== LOCKED_NO_WAITERS) {
      Atomics.store(iab, stateIdx, UNLOCKED);
      Atomics.wake(iab, stateIdx, 1);
    }
  }
}