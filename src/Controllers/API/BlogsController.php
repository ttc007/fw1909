<?php
use vendor\Logs\Log;

/**
 * 
 */
class BlogsController
{
	
	function __construct(){
	}

	function index(){
		echo json_encode(['name'=>'Nguyen Van A']);
	}

	function get($request){
		Log::debug(json_encode($request->getData()));
		echo json_encode($request->getData());
	}

	function store(){

	}
}
