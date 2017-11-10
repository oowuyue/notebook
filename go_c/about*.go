/*

           p2                 p1                 p                 num             标示符 不包含*  标识符给人看最终变成地址
________________________________________________________________________________
|       |        |        |         |        |         |        |       |      |
|       |        |        |         |        |         |        |       |      | 
           x3                 x5                 x7                 1
_________________________________________________________________________________
  X0       X1       X2        X3        x4       x5        x6       x7     x8      地址             
  

        （int ***）         （int **）         （int *）            int             类型      
       
       
 运算符对标示符操作 运算符+标识符 = 表达式
  &运算符  取址
  *运算符  取值间接寻址      ***p2 -> **p1 -> *p -> num
  
  在c语言中，任何引用内存中能存储数据的内存单元的表达式被称为左值 因为都出现在赋值表达式的左边 
  p2 = 5; 左值p2 是标识符
  *a = 12; 下图x4 没有标识符 可以通过*a间接寻址取值
  
  
  
 （字符串）是（字符数组）是受限的（指针)
 
 数组是受限的指针   sizeof(a)==3 和 &(a) == x4 
 ini a[] = {1,2,3}   //a[b]等价于*(a+b)
 a[1] ===  *(a + 1);
 
 
                     a
 ________________________________________________________________________________
|       |        |        |         |        |         |        |       |      |
|       |        |  x4    |         |        |         |        |       |      | 
                                        1          2        3               
_________________________________________________________________________________
  X0       X1       X2        X3        x4       x5        x6       x7     x8      地址       
  
                  int[] (ini *)                                                    类型    
  
*/


package main
import "fmt"
func main() {
   var num int= 20   
   var p *int   
   var p1 **int
   var p2 ***int

   p = &num;
   p1 = &p;
   p2 = &p1;

   fmt.Printf("Address of num variable: %p\n", &num  );
   fmt.Printf("Value of num variable: %d\n\n", num  );
	
   fmt.Printf("Address of p variable: %p\n", &p  );
   fmt.Printf("Value of p variable: %x\n\n", p  );
	
   fmt.Printf("Address of p1 variable: %p\n", &p1  );
   fmt.Printf("Value of p1 variable: %x\n\n", p1  );
	
   fmt.Printf("Address of p2 variable: %p\n", &p2  );
   fmt.Printf("Value of p2 variable: %x\n\n", p2  );
}

#include <stdio.h>
#include <arpa/inet.h>

int main()
{
   int num = 1;
   int *p;
   int **p1; 
   int ***p2;
	
   p = &num;
   p1 = &p;
   p2 = &p1;
   
   printf("Address of num variable: %p\n", &num  );  
   printf("Value of num variable: %d\n\n",  (unsigned int)(long)num  );
	
   printf("Address of p variable: %p\n", &p  );
   printf("Value of p variable: %x\n\n",  (unsigned int)(long)p  );
	
   printf("Address of p1 variable: %p\n", &p1  );
   printf("Value of p1 variable: %x\n\n",  (unsigned int)(long)p1  );
	
   printf("Address of p2 variable: %p\n", &p2  );
   printf("Value of p2 variable: %x\n\n",  (unsigned int)(long)p2  );
	
   printf("Value of **p2 variable: %x\n\n",  **p2  );
	
   return 0;
}

https://tour.go-zh.org/moretypes/1
http://www.jianshu.com/p/6b2d99f9c35a
