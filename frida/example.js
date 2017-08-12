var stdcall  = ptr("0x004114BF")
var thiscall = ptr("0x0041100A")
var fastcall = ptr("0x004111F4")
var cdecl    = ptr("0x00411546")

var stdcall_func = new NativeFunction(stdcall, 'pointer', ['pointer', 'pointer','pointer'] , 'stdcall')
Interceptor.replace(stdcall, new NativeCallback(function (stack1, stack2, stack3) {
	return stdcall_func(stack1, stack2, stack3);
}, 'pointer', ['pointer', 'pointer', 'pointer' ], 'stdcall'));

var thiscall_func = new NativeFunction(thiscall, 'pointer', ['pointer', 'pointer', 'pointer'] , 'thiscall')
Interceptor.replace(thiscall, new NativeCallback(function (ecx, stack1, stack2) {
	return thiscall_func(ecx, stack1, stack2)
}, 'pointer', ['pointer', 'pointer', 'pointer' ], 'thiscall'));

var fastcall_func = new NativeFunction(fastcall, 'pointer', ['pointer', 'pointer','pointer'] , 'fastcall')
Interceptor.replace(fastcall, new NativeCallback(function (ecx, edx, stack1) {
	return fastcall_func(ecx, edx, stack1)
}, 'pointer', ['pointer', 'pointer', 'pointer' ], 'fastcall'));

var cdecl_func = new NativeFunction(cdecl, 'pointer', ['pointer', 'pointer','pointer'] , 'mscdecl')
Interceptor.replace(cdecl, new NativeCallback(function (stack1, stack2, stack3) {
	return cdecl_func(stack1, stack2, stack3)
}, 'pointer', ['pointer', 'pointer', 'pointer' ], 'mscdecl'));

thiscall_func( ptr('0x00421350') , ptr('1') , ptr('2'));