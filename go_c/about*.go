/*

           p2                 p1                 p                 num             符号 不包含*
________________________________________________________________________________
|       |        |        |         |        |         |        |       |      |
|       |        |        |         |        |         |        |       |      | 
           x3                 x5                 x7                 1
_________________________________________________________________________________
  X0       X1       X2        X3        x4       x5        x6       x7     x8      地址             
  

        （int ***）         （int **）         （int *）            int             类型      
       
       
 对符号操作 运算符+符号数据 = 表达式
  &符号  取址
  *符号  取值间接寻址      ***p2 -> **p1 -> *p -> num
  
  
 （字符串）是（字符数组）是受限的（指针)
 
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
