<?php
    session_start();
	$nodeJsPath = './tokens/auth.js';
	//$nodeJsPath = '/usr/home/aa163b0nsh/html/node/tokens/auth.js';
	$currentTime = date('H:i:s');
	if(isset($_SESSION['claris_token_time']) && $_SESSION['claris_token_time'] != ''){
		if(strtotime($currentTime) <= strtotime($_SESSION['claris_token_time'])){
            $ret = $_SESSION['claris_id_token'];
		} else {
			$ret = exec("node ".$nodeJsPath.' 2>&1', $out, $err);
			$_SESSION['claris_id_token'] = $ret;
    		$_SESSION['claris_token_time'] =  date("H:i:s", strtotime('+45 minutes'));
		}
	} else {
		$ret = exec("node ".$nodeJsPath.' 2>&1', $out, $err);
		$_SESSION['claris_id_token'] = $ret;
		$_SESSION['claris_token_time'] =  date("H:i:s", strtotime('+45 minutes'));
	}
	print_r($ret);
?>
