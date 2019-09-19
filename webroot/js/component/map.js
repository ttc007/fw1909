Vue.component('map-view', {
  // The todo-item component now accepts a
  // "prop", which is like a custom attribute.
  // This prop is called todo.
  data: function () {
    return {
      creeps: [
      	{id:1, top:'200px', left:"350px", heal:200, status:1, revive:0 , exp:20, maxHeal:200},
      	{id:2, top:'100px', left:"50px", heal:150, status:1 , revive:0, exp:15, maxHeal:150},
      	{id:3, top:'300px', left:"150px", heal:150, status:1, revive:0, exp:15, maxHeal:150},
      	{id:4, top:'400px', left:"250px", heal:250, status:1, revive:0, exp:25, maxHeal:250},
      	{id:5, top:'100px', left:"150px", heal:250, status:1, revive:0, exp:25, maxHeal:250}
      ],
      itv:0,
      isActtackMap:false,
      creepActtackMap:{}

    }
  },
  props:['top','left', 'hero', 'creepActtack', 'isActtack', 'isRunning'],
  template: `<div class="map-view" :style="{top:top, left:left}">
	  	<creep v-for='creep in creeps' :top="creep.top" :left="creep.left" :heal='creep.heal' :heroX='hero.heroX' :isRunning='isRunning'
	  		:heroY='hero.heroY' :heroTarget='hero.target' v-on:actack='heroAttack' :creep='creep' v-on:updateCreepActtack='updateCreepActtack'
	  		v-on:setTargetAttack='setTargetAttack'></creep>
  	</div>
  	`,
  mounted: function () {
  	var _this = this;
	setInterval(function(){
		for (var i = 0; i< _this.creeps.length; i++){
			if(_this.creeps[i].status==0){
				if(_this.creeps[i].revive==0) {
					_this.creeps[i].revive = 1;
				} else {
					_this.creeps[i].revive = 0;
					_this.creeps[i].status = 1;
					_this.creeps[i].heal = _this.creeps[i].maxHeal;
				}
			}
		}
	},20000);	  
  },
  methods: {
  	heroAttack:function(creep){
  		var _this = this;
  		if(_this.creepActtackMap.id != creep.id){
  			_this.creepActtackMap = creep;
  			_this.isActtackMap = false;
  		}
  		if(!_this.isActtackMap){
	  		setTimeout(function(){
	  			_this.heroSkillMap(creep);
	  		},300);
  			_this.isActtackMap = true;
  		}
  	},
  	updateCreepActtack:function(creep){
  		this.creepActtack = creep;
  	},
  	setTargetAttack:function(creep){
  		this.$emit("setTargetAttack", creep);
  	}
  },
  watch:{
  	creepActtack:function(){
  		if(this.creepActtack){
  			this.creeps[this.creepActtack.id-1] = this.creepActtack;
  		}
  	},
  	isActtack:function(){
  		this.isActtackMap = this.isActtack;
  	},
  	hero:function(val){
  		console.log(val);
  	}
  }
});