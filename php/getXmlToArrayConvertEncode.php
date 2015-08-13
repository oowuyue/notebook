<?php


header("Content-type:text/html;charset=gbk");

function curlGet($url)
{
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // 获取数据返回
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 20);
    curl_setopt($ch, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);

    $content = curl_exec($ch);
    curl_close($ch);
    return $content;
}

function xmlstr_to_array($xmlstr)
{
    $doc = new DOMDocument();
    $doc->loadXML($xmlstr);
    $root = $doc->documentElement;
    $output = domnode_to_array($root);
    $output['@root'] = $root->tagName;
    return $output;
}

function domnode_to_array($node)
{
    $output = array();
    switch ($node->nodeType)
    {
        case XML_CDATA_SECTION_NODE:
        case XML_TEXT_NODE:
            $output = trim($node->textContent);
            break;
        case XML_ELEMENT_NODE:
            for ($i = 0, $m = $node->childNodes->length; $i < $m; $i++)
            {
                $child = $node->childNodes->item($i);
                $v = domnode_to_array($child);
                if (isset($child->tagName))
                {
                    $t = $child->tagName;
                    if (!isset($output[$t]))
                    {
                        $output[$t] = array();
                    }
                    $output[$t][] = $v;
                }
                elseif ($v || $v === '0')
                {
                    $output = (string) $v;
                }
            }
            if ($node->attributes->length && !is_array($output))
            { //Has attributes but isn't an array
                $output = array('@content' => $output); //Change output into an array.
            }
            if (is_array($output))
            {
                if ($node->attributes->length)
                {
                    $a = array();
                    foreach ($node->attributes as $attrName => $attrNode)
                    {
                        $a[$attrName] = (string) $attrNode->value;
                    }
                    $output['@attributes'] = $a;
                }
                foreach ($output as $t => $v)
                {
                    if (is_array($v) && count($v) == 1 && $t != '@attributes')
                    {
                        $output[$t] = $v[0];
                    }
                }
            }
            break;
    }
    return $output;
}

function encodeConverter($array, $encode)
{
    array_walk_recursive($array, function(&$item, $key) {
        if (!mb_detect_encoding($item, $encode, true))
        {
            $item = utf8_encode($item);
        }
    });

    return $array;
}

function array_iconv($in_charset, $out_charset, $arr)
{
    return eval('return ' . iconv($in_charset, $out_charset, var_export($arr, true) . ';'));
}

$xml = xmlstr_to_array(curlGet('http://www.lieqi.me/2345a/lieqi.xml'));

echo "<pre>";
print_r(array_iconv('utf-8', 'gbk', $xml));
echo "</pre>";

