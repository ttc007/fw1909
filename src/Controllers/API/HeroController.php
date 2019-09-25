<?php
use vendor\Logs\Log;
use src\Model\Hero;
use src\Model\Hero_skill;
use src\Model\Skill;


/**
 * 
 */
class HeroController
{
	
	function __construct(){
	}

	function index(){
		echo json_encode(['name'=>'Nguyen Van A']);
	}

	function get($request){
		$hero = Hero::find($request->getData()['id']);
		$hero->skills = Hero_skill::getList(['hero_id' => $hero->id]);
		foreach ($hero->skills as $key => $hero_skill) {
			$skill = Skill::find($hero_skill->skill_id);
			$hero_skill->name = $skill->name;
			$hero_skill->description = $skill->description;
		}
		echo json_encode($hero);
	}

	function store($request){

	}
}
