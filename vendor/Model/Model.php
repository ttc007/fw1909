<?php
namespace vendor\Model;
use PDO;
use vendor\Logs\Log;
/**
 * 
 */
class Model
{
	public static $db;
	public static $table = '';

	public static function init(){
		$db = new PDO("mysql:host=localhost;dbname=fw1909;charset=utf8", 'root', '');
	    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		self::$db = $db;
		self::$table = substr( get_called_class(), 10, 100);
	}

	public static function find($id){
		self::init();
		$sql = "SELECT * FROM ".self::$table." WHERE id = :id";
		Log::debug($sql);
		$stmt = self::$db->prepare($sql); 
		$stmt->bindValue(':id', $id);
		$stmt->execute();
		$row =$stmt->fetchObject();
		return $row;
	}

	public static function getList($conditions){
		self::init();
		$sql = "SELECT * FROM ".self::$table;
		$data = [];
		if(count($conditions)>0){
			$sql.=" WHERE ";
			foreach ($conditions as $key => $value) {
				$sql .= $key."= ?,";
				$data[] = $value;
			}
		}
		$sql = substr($sql,0,-1);
		Log::debug($sql);
		$stmt = self::$db->prepare($sql); 
		$stmt->execute($data);
		$rows = $stmt->fetchAll(PDO::FETCH_OBJ);
		return $rows;
	}
}