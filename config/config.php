<?php
$indexPrefix = 3;
$indexController = $indexPrefix + 1;
$indexAction = $indexController + 1;

$config = [
	'webroot' => "webroot/",
];

$dbConfig = [
	'username' => 'root',
	'password' => '',
	'dbname' => 'fw1909',
	'host' => 'mysql:host=localhost'
];


function webroot($path){
	return $GLOBALS['config']['webroot'].$path;
}