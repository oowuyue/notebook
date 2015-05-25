<?php
class RSA
{
    public static function generatePair($dir)
    {
        $config = array(
            "digest_alg" => "sha512",
            "private_key_bits" => 2048,
            "private_key_type" => OPENSSL_KEYTYPE_RSA,
        );
        
        // Create the private and public key
        $res = openssl_pkey_new($config);
        
        // Extract the private key from $res to $privKey
        openssl_pkey_export($res, $privKey);
        
        // Extract the public key from $res to $pubKey
        $pubKey = openssl_pkey_get_details($res);
        $pubKey = $pubKey["key"];
        
        file_put_contents("{$dir}/privateKey.pem", $privKey);
        file_put_contents("{$dir}/publicKey.pem", $pubKey);
    }

    public static function encryptWithPublicKey($publicKeyFile, $data)
    {
        // 加载公钥
        $publicKey = openssl_pkey_get_public(file_get_contents($publicKeyFile));
        // 使用公钥进行加密
        $maxLen = 245;
        $count = intval(ceil(strlen($data)/$maxLen));
        
        $lastEncryptedData = '';
        
        for($i=0; $i < $count; $i++) {
            $encryptedData = '';
            openssl_public_encrypt(substr($data, $i*$maxLen, $maxLen), $encryptedData, $publicKey);
            $lastEncryptedData .= $encryptedData;
        }
        
        return base64_encode($lastEncryptedData);
    }    

    public static function decryptWithPrivateKey($privateKeyFile, $data)
    {
        // 私钥密码
        $passphrase = '';
 
        // 加载私钥
        $privateKey = openssl_pkey_get_private(file_get_contents($privateKeyFile), $passphrase);

        $data = base64_decode($data);
        $maxLen = 256;
        
        $count = intval(ceil(strlen($data)/$maxLen));
        $lastSensitiveData = '';
        
        // 使用公钥进行加密
        for($i=0; $i< $count; $i++) {
            $sensitiveData = '';
            openssl_private_decrypt(substr($data, $i*$maxLen, $maxLen), $sensitiveData, $privateKey);
            $lastSensitiveData .= $sensitiveData;
            
        }
        return $lastSensitiveData;
    }
    
    public static function signWithPrivateKey($privateKeyFile, $data)
    {
        // $data = json_encode(array("applyId"=> "15451257515", "phone"=>"18612648090"));
        // $privatekeyFile = '/home/work/baidu_finance.pem';
        $passphrase = '';

        // 摘要及签名的算法
        $digestAlgo = 'sha512';
        $algo = OPENSSL_ALGO_SHA1;
        
        // 加载私钥
        $privateKey = openssl_pkey_get_private(file_get_contents($privateKeyFile), $passphrase);
        // 生成摘要
        $digest = openssl_digest($data, $digestAlgo);
        // 签名
        $signature = '';
        
        openssl_sign($digest, $signature, $privateKey, $algo);
        
        $signature = base64_encode($signature);
        
        return $signature;
    }

    public static function verify($publicKeyFile, $signature, $data)
    {
        // 摘要及签名的算法，同上面一致
        $digestAlgo = 'sha512';
        $algo = OPENSSL_ALGO_SHA1;

        // 加载公钥
        $publicKey = openssl_pkey_get_public(file_get_contents($publicKeyFile));
 
        // 生成摘要
        $digest = openssl_digest($data, $digestAlgo);
 
        // 验签
        $verify = openssl_verify($digest, base64_decode($signature), $publicKey, $algo);
        
        return ($verify == 1); // int(1)表示验签成功
    }

}
