<?php
use vendor\Logs\Log;
use src\Model\Map;
use src\Model\Creep;
use src\Model\Map_creep;


/**
 * 
 */
class MapController
{
	
	function __construct(){
	}

	function index(){
		echo json_encode(['name'=>'Nguyen Van A']);
	}

	function get($request){
		$map = Map::find($request->getData()['id']);
		$map->creeps = Map_creep::getList(['map_id' => $map->id]);
		foreach ($map->creeps as $key => $map_creep) {
			$creep = Creep::find($map_creep->creep_id);
			$map_creep->name = $creep->name;
			$map_creep->heal = $creep->heal;
		}
		echo json_encode($map);
	}

	function store($request){

	}
}
