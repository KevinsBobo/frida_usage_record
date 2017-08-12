'''
example: 修改game.exe为无敌模式
'''

# python2 需要引入下面的这个包
from __future__ import print_function
import codecs
import frida
import sys

def on_message(message, data):
    print("[%s] => %s" % (message, data))

def main(target_process):
    # 获取进程会话\打开进程句柄
    session = frida.attach(target_process)

    # 读内存 read_bytes(address, bytes)
    print(hex(session.read_bytes(0x00403616, 1)[0]))
    # 写内存 write_bytes(address, data)
    # 错误 frida.core.RPCException: Error: access violation accessing 0x403616
	# 用 js 脚本的方式写内存也是同样地错误
    # 但 js 脚本在写内存前调用 Memory.protect(ptr("0x00403616"), 8, 'rw-'); 就没问题
    # 而 py 脚本没有这个 API
    # session.write_bytes(0x00403616, b'xeb')

    with codecs.open('./invincible.js', 'r', 'utf-8') as f:
        source = f.read()

    script = session.create_script(source)
    script.on('message', on_message)
    script.load()
    session.detach()


if __name__ == '__main__':
    # 进程PID或进程名
    target_process = 'game.exe'
    main(target_process)