<?php

/**
 * @author Kingster
 * @author SuyashBansal
 * @category SMS
 * @copyright 2015
 * @description Request this page with get or post params
 * @param uid = Way2SMS Username
 * @param pwd = Way2SMS Password
 * @param phone = Number to send to. Multiple Numbers separated by comma (,).
 * @param msg = Your Message ( Upto 140 Chars)
 */

include('way2sms-api.php');

if (isset($_POST['username']) && isset($_POST['password']) && isset($_POST['receipt']) && isset($_POST['message'])) {
    $res = sendWay2SMS($_POST['username'], $_POST['password'], $_POST['receipt'], $_POST['message']);
    if (is_array($res))
        echo $res[0]['result'] ? 'true' : 'false';
    else
        echo $res;
    exit;
}
