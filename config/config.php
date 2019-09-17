<?php
$indexPrefix = 3;
$indexController = $indexPrefix + 1;
$indexAction = $indexController + 1;

$config = [
	'webroot' => "webroot/"
];

function webroot($path){
	return $GLOBALS['config']['webroot'].$path;
}