#!/usr/bin/env node
const a = 1
const b = function() {
  console.log('test_1 b')
}
export { a, b }
export default function() {
  console.log('tets_1 default')
}