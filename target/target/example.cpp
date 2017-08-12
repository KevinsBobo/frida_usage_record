// FridaABI.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <iostream>
#include <iomanip>


struct object {
    virtual int __thiscall thiscall(int b, int c) {
        std::cout << "from thiscall " << this << " " << b << " " << c << std::endl;
        return 0xCAFE;
    }
    static object *get_instance() {
        static object o;
        return &o;
    }
};

int __stdcall stdcall(object *a, int b, int c) {
    std::cout << "from stdcall " << a << " " << b << " " << c << std::endl;
    return 0xCAFE;
}


int __fastcall fastcall(object * a, int b, int c) {
    std::cout << "from fastcall " << a << " " << b << " " << c << std::endl;
    return 0xCAFE;
}

int __cdecl cdecl_(object * a, int b, int c) {
    std::cout << "from cdecl " << a << " " << b << " " << c << std::endl;
    return 0xCAFE;
}

//each in separate function to force stack checking
void dostdcall() {
    stdcall(object::get_instance(), 1, 2);
}

void dothiscall() {
    object::get_instance()->thiscall(1, 2);
}

void dofastcall() {
    fastcall(object::get_instance(), 1, 2);
}

void docdecl() {
    cdecl_(object::get_instance(), 1, 2);
}

int main__()
{
  int i = **(std::size_t**)object::get_instance();
  std::cout << "var stdcall  = ptr(\"0x" << std::hex << std::uppercase << std::setw(8) << std::setfill('0') << &stdcall << "\")" << std::endl;
  std::cout << "var thiscall = ptr(\"0x" << std::hex << std::uppercase << std::setw(8) << std::setfill('0') << **(std::size_t**)object::get_instance() << "\")" << std::endl;
  std::cout << "var fastcall = ptr(\"0x" << std::hex << std::uppercase << std::setw(8) << std::setfill('0') << &fastcall << "\")" << std::endl;
  std::cout << "var cdecl    = ptr(\"0x" << std::hex << std::uppercase << std::setw(8) << std::setfill('0') << &cdecl_ << "\")" <<  std::endl;
  while (true) {
      dostdcall();
      dothiscall();
      dofastcall();
      docdecl();
      std::cin.ignore();
  }
  return 0;
}