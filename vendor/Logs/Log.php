<?php
namespace vendor\Logs;
/**
 * 
 */
class Log
{
	function __construct(){}

	public static function debug($msg){
		$txt = file_get_contents(__DIR__."/../../Logs/debug.txt");
		file_put_contents(__DIR__."/../../Logs/debug.txt", $txt."\n[Debug][".date("Y-m-d h:i:sa")."]:".$msg);
	}
}