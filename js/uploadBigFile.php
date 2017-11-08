<?php

if(isset($_POST["name"])){

    if( $_POST["currentSlice"] <= $_POST["totalSlices"] ){
        $target = "uploads/" .iconv("utf-8","gbk",$_POST["name"]) . '-' . $_POST['currentSlice'];
        move_uploaded_file($_FILES['file']['tmp_name'], $target);
        sleep(1);
    }

    if( $_POST["currentSlice"] == $_POST["totalSlices"] ){
        $target = "uploads/" .iconv("utf-8","gbk",$_POST["name"]);
        $dst = fopen($target, 'wb');

        for($i = 1; $i <= $_POST['totalSlices']; $i++) {
            $slice = $target . '-' . $i;
            $src = fopen($slice, 'rb');
            stream_copy_to_stream($src, $dst);
            fclose($src);
            unlink($slice);
        }
        fclose($dst);
    }
    return;
}
?>
<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <title>大文件上传实例</title>
</head>

<body>
    <input type="file" id="file" />
    <br>
    <label id="percent" style="width: 100px;height: 100px;display: block;"></label>
    <br>
    <button onclick="sendRequest()">上传</button>
    <script type="text/javascript">
    const BYTES_PER_CHUNK = 1024 * 1024; // 每个文件切片大小定为1MB .
    var percentLabel = document.getElementById('percent');
    var totalSlices;
    
    function sendRequest() {

        var blob = document.getElementById('file').files[0];
        var start = 0;
        var end;

        totalSlices = Math.ceil(blob.size / BYTES_PER_CHUNK);
        currentSlice = 1;

        while (start < blob.size) {
            end = start + BYTES_PER_CHUNK;
            if (end > blob.size) {
                end = blob.size;
            }

            uploadFile(blob, currentSlice, start, end);

            start = end;
            currentSlice++;
        }
    }

    function uploadFile(blob, currentSlice, start, end) {
        var xhr;
        var fd;
        var chunk;

        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.responseText) {
                    alert(xhr.responseText);
                }
                percentLabel.innerHTML = (currentSlice / totalSlices * 100).toFixed(0)+ "%";
            }
        };

        chunk = blob.slice(start, end); //切割文件
        fd = new FormData();
        fd.append("file", chunk);
        fd.append("name", blob.name);
        fd.append("currentSlice", currentSlice);
        fd.append("totalSlices", totalSlices);
        xhr.open("POST", "test.php", true);
        xhr.send(fd);
    }
    </script>
</body>

</html>
