<?php

//http://php.net/manual/zh/function.fread.php
$opts = array(
    'http' => array(
        'method' => "GET",
        'header' => "Accept-language: en\r\n" .
        "Cookie: foo=bar\r\n"
    )
);

$context = stream_context_create($opts);

$fp = fopen('http://www.example.com', 'rb', false, $context);

//one
$contents = '';
while (!feof($fp)) {
    $contents .= fread($fp, 8192);
}
//two
$contents = stream_get_contents($handle);

fclose($fp);


//********************************************************
//http://stackoverflow.com/questions/6914912/streaming-a-large-file-using-php
define('CHUNK_SIZE', 1024 * 1024); // Size (in bytes) of tiles chunk
// Read a file and display its content chunk by chunk

function readfile_chunked($filename, $retbytes = TRUE)
{
    $buffer = '';
    $cnt = 0;
    // $handle = fopen($filename, 'rb');
    $handle = fopen($filename, 'rb');
    if ($handle === false) {
        return false;
    }
    while (!feof($handle)) {
        $buffer = fread($handle, CHUNK_SIZE);
        echo $buffer;
        ob_flush();
        flush();
        if ($retbytes) {
            $cnt += strlen($buffer);
        }
    }
    $status = fclose($handle);
    if ($retbytes && $status) {
        return $cnt; // return num. bytes delivered like readfile() does.
    }
    return $status;
}

// Here goes your code for checking that the user is logged in
// ...
// ...

if ($logged_in) {
    $filename = 'path/to/your/file';
    $mimetype = 'mime/type';
    header('Content-Type: ' . $mimetype);
    readfile_chunked($filename);
}
else {
    echo 'Tabatha says you haven\'t paid.';
}
 
