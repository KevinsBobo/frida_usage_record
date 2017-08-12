// 植物大战僵尸1.0.0.1051版 

// 获取战场环境指针
var pEnv = Memory.readUInt(ptr("0x6A9EC0")) + 0x768;
pEnv = Memory.readUInt(ptr(pEnv.toString(10)));

console.log(pEnv);

// 种植物函数，在底层这个函数的Y坐标参数是通过寄存器传参的，在这里都不用管，很方便
var plantcall = ptr("0x0040D120");

var plantcall_func = new NativeFunction(plantcall, 'int', ['pointer', 'uint', 'uint', 'uint', 'int']);

plantcall_func(ptr(pEnv), 0, 0, 0, 1);

// 不需要
/* Interceptor.replace(plantcall, new NativeCallback(function (pEnv, uX, uY, uType, nR) {
	return plantcall_func(pEnv, uX, uY, uType, nR);
}, 'int', ['pointer', 'uint', 'uint', 'uint', 'int'])); */
