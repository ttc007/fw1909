<?php
require_once "config/config.php";
// require_once "vendor/Logs/Log.php";
// require_once "vendor/HttpFoundation/Request.php";
// require_once "vendor/Model/Model.php";
// require_once "src/Model/Hero_skill.php";
// require_once "src/Model/Skill.php";
// require_once "src/Model/Hero.php";
// require_once "src/Model/Map.php";
// require_once "src/Model/Creep.php";
// require_once "src/Model/Map_creep.php";
spl_autoload_register(function($class){
	$file = str_replace('\\', DIRECTORY_SEPARATOR, $class) . '.php';

    $path = $file;
    if (file_exists($path)) {
        require_once $path;
    }
});


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
	$controllerPath = "src/Controllers/API/".$controllerClass.".php";
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
