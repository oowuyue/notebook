<?php

$fArray = array();

function readFileFromDir($dir)
{
    if (!is_dir($dir))
        return false;

    $handle = opendir($dir); //打开目录
    while (($file = readdir($handle)) !== false)
    {

        if ($file == '.' || $file == '..')
        {
            continue;
        }
        $file = $dir . DIRECTORY_SEPARATOR . $file;
        if (is_file($file) && pathinfo($file)['extension'] == 'php')//是文件就输出
        {
            staticFunc($file);
        }
        elseif (is_dir($file))
        {
            readFileFromDir($file); //递归查询
        }
    }
    closedir($dir); //关闭目录
}

function staticFunc($file)
{
    global $fArray;
    $handle = @fopen("$file", "r");
    if ($handle)
    {
        while (($buffer = fgets($handle, 4096)) !== false)
        {
            preg_match_all("#(\w+?)\(#is", $buffer, $matches);//匹配php函数 function_name(
            $functions = $matches[1];
            foreach ($functions as $fName)
            {
                if (function_exists($fName))
                {
                    isset($fArray["$fName"]) ? $fArray["$fName"] ++ : $fArray["$fName"] = 1;
                }
            }
        }
        fclose($handle);
    }
}

$dir = '.';
readFileFromDir($dir);

arsort($fArray);
echo '<pre>';
print_r($fArray);
echo '</pre>';
