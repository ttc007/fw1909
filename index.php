<?php
require_once "config/config.php";
require_once "vendor/Logs/Log.php";
require_once "vendor/HttpFoundation/Request.php";

use vendor\HttpFoundation\Request;
use vendor\Logs\Log;

$uri = $_SERVER['REQUEST_URI'];
Log::debug($uri);

$routes = explode('?', $uri)[0];
$routes = explode("/",$routes);


$prefix = isset($routes[$indexPrefix])?$routes[$indexPrefix]:"";
$controller = ucfirst(isset($routes[$indexController])?$routes[$indexController]:"");
$action = isset($routes[$indexAction])?$routes[$indexAction]:"index";

if($prefix == "") {
	include "src/Views/index.php";
	exit();
} elseif($prefix=='api') {
	Log::debug($prefix);
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
