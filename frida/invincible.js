// example: 修改game.exe为无敌模式
'use strict';
// console.log(Process.pageSize);
// console.log(Process.pointerSize);
Memory.protect(ptr("0x00403616"), 8, 'rw-');
Memory.writeU8(ptr("0x00403616"), 0xeb);
var invincibleStuts = Memory.readU8(ptr("0x00403616"));
console.log("0x" + invincibleStuts.toString(16));
