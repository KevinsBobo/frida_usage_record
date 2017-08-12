/*  Interceptor.attach(ptr("0x004111FE"), {
    onEnter: function(args) {
		console.log("CFunc::func->")
		console.log(args[0]);
		console.log(args[1]);
		console.log(args[2]);
		console.log(args[3]);
		console.log(args[4]);
		console.log(args[5]);
    }
}); */

// var f = new NativeFunction(ptr("0x0041107D"), 'int', ['int', 'int']);

// console.log(f);

// console.log(f(1, 5000));


var thiscall = ptr("0x004113B6");

var thiscall_func = new NativeFunction(thiscall, 'void', ['pointer'] , 'thiscall');
/* Interceptor.replace(thiscall, new NativeCallback(function (ecx) {
	return thiscall_func(ecx);
}, 'void', ['pointer'], 'thiscall')); */

thiscall_func( ptr('0x00421360'));

thiscall = ptr("0x0041153C");

thiscall_func = new NativeFunction(thiscall, 'int', ['pointer', 'int'] , 'thiscall');

console.log(thiscall_func( ptr('0x00421360'), 0xb ));

Interceptor.replace(thiscall, new NativeCallback(function (ecx, stack1) {
	console.log(ecx);
	console.log(stack1);
	return 1;// thiscall_func(ecx, stack1);
}, 'int', ['pointer', 'int'], 'thiscall'));
