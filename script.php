<?php
    // Create a stream
	$opts = array(
		'http'=>array(
		'method'=>"GET",
		'header'=>"Accept-language: en\r\n" .
					"Cookie: foo=bar\r\n"
		)
	);
	$context = stream_context_create($opts);
	// Open the file using the HTTP headers set above
	$getClarisIdToken = file_get_contents('http://localhost/node/app.php', false, $context);
	print_r($getClarisIdToken);
?>

