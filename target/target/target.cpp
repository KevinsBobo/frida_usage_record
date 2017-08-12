// target.cpp : 定义控制台应用程序的入口点。
//

#include "stdafx.h"
#include <windows.h>


int func(int a , int b)
{
  printf("%d + %d = %d\n" , a , b, a + b);
  return a + b;
}


class CFunc
{
public:
  CFunc()
    : m_nNum(1)
  {}

  /*virtual*/ int /*__thiscall*/ funcA(int a)
  {
    printf("%d + %d = %d\n" , a , m_nNum, a + m_nNum);
    return a + m_nNum;
  }

  /*virtual*/ void /*__thiscall*/ funcB()
  {
    printf("0x%p -> %d is my member\n" , this , m_nNum);
  }

private:
  int m_nNum;
};


int _tmain(int argc, _TCHAR* argv[])
{
  // printf("func: 0x%p\n" , func);
  static CFunc objA;
  // int i = **(size_t**)(&objA); // 对于虚函数的地址要通过虚表获得
  // printf("CFunc::func(int): 0x%08x\n" , i);
  printf("CFunc::funcA(void): 0x%p\n" , &CFunc::funcA);
  printf("CFunc::funcB(void): 0x%p\n" , &CFunc::funcB);
  printf("CFunc &objA: 0x%p\n" , &objA);
  objA.funcB();

  getchar();

  // for(int i = 0; ; ++i)
  // {
  //   printf("[%d]: Get->%d\n" , i , func(i , i + 1));
  //   Sleep(2000);
  // }

  for(int i = 0; ; ++i)
  {
     printf("CFunc &obj: [%d]: Get-> %d\n" , i , objA.funcA(i));
     Sleep(2000);
  }

	return 0;
}

