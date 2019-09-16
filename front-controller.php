<?php

include "vendor/Logs/Log.php";
use vendor\Logs\Log;
require_once "vendor/HttpFoundation/Request.php";
use vendor\HttpFoundation\Request;

$uri = $_SERVER['REQUEST_URI'];
Log::debug($uri);

$indexPrefix = 2;
$indexController = 3;
$indexAction = 4;

$routes = explode('?', $uri)[0];
$routes = explode("/",$routes);


$prefix = isset($routes[$indexPrefix])?$routes[$indexPrefix]:"";
$controller = ucfirst(isset($routes[$indexController])?$routes[$indexController]:"");
$action = isset($routes[$indexAction])?$routes[$indexAction]:"index";
$param = [];
if(count($routes)>$indexAction) $param = array_slice($routes, 5);


if($prefix == "") {
	require "index.php";
	exit();
} elseif($prefix=='api') {
	$controllerClass = $controller.'Controller';
	$controllerPath = "Controllers/API/".$controllerClass.".php";
	if(file_exists($controllerPath)){
		require $controllerPath;
		$cObj = new $controllerClass;
		if(method_exists($cObj, $action)) {
			$request = new Request();
			$cObj->{$action}($request);
		} else {
			echo "Method ".$action." not exist in controller...!";
		}
	} else {
		echo "Controller ".$controller." not exist...!";
	}
}
