<?php

class Permutation
{

    public static $arr = ["a", "b", "c"];
    //**************************************************************************************************/
    public static $callCount = 0;
    public static $count = 1;

    public static function swap($i1, $i2)
    {
        $temp = self::$arr[$i2];
        self::$arr[$i2] = self::$arr[$i1];
        self::$arr[$i1] = $temp;
    }

    public static function recursionPermutation($arr, $begin, $end)
    {
        self::$callCount++;
        if ($end == $begin) {
            echo implode(' ', $arr) . self::$count++ . '<br>';
            return;
        }
        else {
            for ($j = $begin; $j <= $end; $j++) {
                self::swap($begin, $j);               //for循环将begin~end中的每个数放到begin位置中去  
                self::recursionPermutation(self::$arr, $begin + 1, $end);   //假设begin位置确定，那么对begin+1~end中的数继续递归  
                self::swap($begin, $j);               //换过去后再还原  
            }
        }
    }

    //**************************************************************************************************/
    public static function noRecursion()
    {
        foreach (self::$arr as $v) {
            $arr2 = array_diff(self::$arr, array($v));
            foreach ($arr2 as $v2) {
                $arr3 = array_diff($arr2, array($v2));
                foreach ($arr3 as $v3) {
                    echo "$v $v2 $v3 <br>";
                }
            }
        }
    }

}

Permutation::recursionPermutation(Permutation::$arr, 0, 2);
echo Permutation::$callCount;

echo "<hr>";

Permutation::noRecursion();
