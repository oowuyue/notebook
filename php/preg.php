<?php


$subject = "hype,rtext_language,_programming";
$pattern = "/[,_]+/";//默认贪婪
$pattern = "/[,_]+?/";//非贪婪


$match_res = preg_match_all($pattern, $subject, $matches);//preg_match
$split_res = preg_split($pattern, $subject);

var_dump($match_res);
echo "<pre>";
print_r($matches);
echo "</pre>";

echo "<pre>";
print_r($split_res);
echo "</pre>";

exit;
 
