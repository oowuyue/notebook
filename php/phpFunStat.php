<?php

$fArray = array();

$total = 0;

function readFileFromDir($dir)
{
    if (!is_dir(
                    $dir))
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
    closedir($dir)

    ; //关闭目录
}

function staticFunc($file)
{
    global $fArray, $total;
    $handle = @fopen("$file", "r");
    if ($handle)
    {
        while (( $buffer = fgets($handle, 4096)) !== false)
        {
            preg_match_all("#(\w+?)\(#is", $buffer, $matches); //匹配php函数 function_name(
            $functions = $matches[1];
            foreach ($functions as $fName)
            {
                if (function_exists($fName))
                {
                    $total++;
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


echo<<<EOD
<!DOCTYPE html>
<html lang="zh-cn">
<head>
  <meta charset="utf-8">
  <link href="http://cdn.bootcss.com/bootstrap/3.3.1/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<table class="table table-condensed">
    <tr>
        <th>functionName</th>
        <th>count</th>
        <th>rate</th>
    </tr>

EOD;


foreach ($fArray as $fName => $count)
{
    $rate = $count / $total * 100 . "%";
    echo<<<EOD
    <tr>
        <td>$fName</td>
        <td>$count</td>
        <td>$rate</td>
    </tr>
EOD;
}

echo<<<EOD
</table> 
</body>
</html>
EOD;
