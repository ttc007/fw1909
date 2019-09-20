Vue.component('hero', {
  // The todo-item component now accepts a
  // "prop", which is like a custom attribute.
  // This prop is called todo.
  data:function(){
  	return {
  		topSkill:"-34px",
  		leftSkill:"5px",
  		targetAttack:{},
  		skillAction:0,
  		background:"url(webroot/img/camera/heroSprites.png)",
      backgroundPosition:"0 0",
      spriteIndexRun:0
  	}
  },
  props: ['cX', 'cY', 'heroTarget', 'action', 'creepTarget', 'skillActive', 'direction'],
  template: `<div class='hero-container' :style="{left:cX+'px', top:cY+'px'}">
  	<div class='container-skill'>
  		<skill :top='topSkill' :left="leftSkill" :skillAction='skillAction' v-on:setBackground='setBackground'
  		v-on:updateCreepAttackAfterSkill='updateCreepAttackAfterSkill' 
  		:creepTarget='creepTarget'></skill>
  	</div>
  	<div class='hero' :style='{background:background,"background-position":backgroundPosition}'>
    </div>
  </div>`,
  mounted: function () {
    //
  },
  methods:{
  	getAround:function(){
  		this.$emit('getAround');
  	},
    attack:function(){
  		var _this = this;
  		_this.skillAction = _this.skillActive;
    },
    setBackground:function(background){
    	this.background = background;
    },
    updateCreepAttackAfterSkill:function(){
  		var _this = this;
    	_this.$emit('updateCreepAttackAfterSkill');
      	if(_this.creepTarget.heal > 0 ) {
      		_this.$emit('autoAttack');
      	}
      	_this.skillAction = 0;
    }
  },
  watch:{
  	action:function(action){
  		console.log(action);
      var _this = this;
  		if(action == 'stand'){
        if(_this.direction=="bottom") _this.backgroundPosition = "0 0";
        else if(_this.direction=="top") _this.backgroundPosition = "0 179px";
        else if(_this.direction=="left") _this.backgroundPosition = "0 269px";
        else if(_this.direction=="right") _this.backgroundPosition = "82px 445px";
  			this.getAround();
  		} else if(action == 'attack') {
  			this.attack();
  		} else if(action == 'run') {
        var itv = setInterval(function(){
          if(_this.action=='run'){
            _this.spriteIndexRun++;
            if(_this.spriteIndexRun==9) _this.spriteIndexRun = 1;
            if(_this.direction=="bottom") _this.backgroundPosition = 82*_this.spriteIndexRun+"px 0";
            if(_this.direction=="top") _this.backgroundPosition = 82*_this.spriteIndexRun+"px 179px";
            if(_this.direction=="left") _this.backgroundPosition = 82*_this.spriteIndexRun+"px 269px";
            if(_this.direction=="right") _this.backgroundPosition = 83*_this.spriteIndexRun+"px 445px";

          } else {
            clearInterval(itv);
          }
        }, 150);
      }
  	},
    direction:function(direction){
      if(direction == "bottom") this.backgroundPosition = "0 0";
      else if(direction == "top") this.backgroundPosition = "0 179px";
      else if(direction == "left") this.backgroundPosition = "0 269px";
      else if(direction == 'right') this.backgroundPosition = "0 445px";
      // console.log(direction);
    }
  }
});