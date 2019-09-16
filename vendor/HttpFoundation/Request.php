<?php
namespace vendor\HttpFoundation;

/**
 * 
 */
class Request
{
	function __construct(){}

	function getData(){
		if($_SERVER['REQUEST_METHOD']=="GET"){
			return $_GET;
		} else {
			return $_POST;
		}
	}

	function is($methods){
		if(gettype($methods) == 'array'){
			foreach ($methods as $method) {
				if($_SERVER['REQUEST_METHOD'] == $method) return true;
			}
		} else {
			if($_SERVER['REQUEST_METHOD'] == $methods) return true;
		}
		
		return false;
	}
}