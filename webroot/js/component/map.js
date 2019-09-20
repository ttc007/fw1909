Vue.component('map-view', {
  // The todo-item component now accepts a
  // "prop", which is like a custom attribute.
  // This prop is called todo.
  data: function () {
    return {
      creeps: [],
      itv:0,
      isActtackMap:false,
      creepActtackMap:{},
      hero:{
        cX: 400,
        cY: 300,
        target: 100,
        dame: 40,
        exp:0,
        expUpLevel:30,
        level:1,
        creepTarget:{},
        creepDames:[],
        skill:true,
        action:"stand",
        autoAttack:true,
        skillActive:2,
        skills:[],
        direction:" bottom",
        strength:20,
        energy:30,
        vitamin:25,
        agi:20,
        potential:0,
      },

    }
  },
  props:['top','left', 'creepActtack', 'isActtack', 'isRunning'],
  template: `<div class="map-view" :style="{top:top, left:left}" v-on:click='mapClick'>
	  	<creep v-for='creep in creeps' :cX="creep.cX" :cY="creep.cY" :heal='creep.heal' v-on:setTargetAttack='setTargetAttack'></creep>
      <hero :action='hero.action' :cX='hero.cX' :cY='hero.cY' :heroTarget='hero.target'
        :skillActive='hero.skillActive'
        v-on:getAround='getAround' :creepTarget='hero.creepTarget' 
        v-on:autoAttack='autoAttack' v-on:setSkills='setSkills'
        :direction='hero.direction'
      ></hero>
  	</div>
  	`,
  mounted: function () {
  	var _this = this;
	  _this.mapInit();	  
  },
  methods: {
    mapInit:function(){
      var _this = this;
      $.ajax({
        url:'api/map/get',
        type:'GET',
        dataType:'json',
        data:{
          id:1
        },
        success:function(data){
          _this.creeps = data.creeps;
        }
      });
    },
    mapClick:function(e){
      console.log(e);
      var X = e.clientX - parseInt(_this.width)/2 ;
      var Y = e.clientY - parseInt(_this.height)/2;

      // console.log(e.clientX+"-"+e.clientY);
      if( e.clientY < 300 ) _this.hero.direction = 'top';
      else if( e.clientY > 370) _this.hero.direction = 'bottom';
      else if( e.clientX < 385) _this.hero.direction = 'left';
      else if( e.clientX > 445) _this.hero.direction = 'right';
     
      if(window.myInterval != undefined && window.myInterval != 'undefined'){
        window.clearInterval(window.myInterval);
      }
      var stepX = Math.abs(X);
      var stepY = Math.abs(Y);
      var hypotenuse = Math.round(Math.sqrt(stepX*stepX + stepY*stepY));

      var t = hypotenuse/_this.v;
      _this.i = 0 ;

      window.myInterval = setInterval(function(){
        _this.hero.action = 'run';
        _this.hero.autoAttack = false;
        _this.i ++;
          if(Y > 0 ){
            _this.hero.cY = _this.hero.cY + parseFloat(_this.v*stepY/hypotenuse);
          } else if(Y < 0) {
            _this.hero.cY =  _this.hero.cY - parseFloat(_this.v*stepY/hypotenuse);
          }

          if(X > 0 ){
            _this.hero.cX = _this.hero.cX + parseFloat(_this.v*stepX/hypotenuse);
          } else if( X < 0) {
            _this.mapLeft =( parseFloat(_this.mapLeft) + parseFloat(_this.v*stepX/hypotenuse)) + "px";
            _this.hero.heroX = _this.hero.heroX - parseFloat(_this.v*stepX/hypotenuse);
          }
          if(_this.i>=t) {
            window.clearInterval(window.myInterval);
            _this.hero.action = 'stand';
            _this.hero.autoAttack = true;
          }
      }, _this.T );
    },
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
  	},
    getAround:function(){
      var _this = this;
      var sX = Math.abs(parseInt(_this.hero.creepTarget.left) - _this.hero.heroX);
      var sY = Math.abs(parseInt(_this.hero.creepTarget.top) - _this.hero.heroY);
      if(sX < _this.hero.target && sY < _this.hero.target && this.hero.creepTarget.status == 1){
        _this.hero.action = 'attack';
      }
    },
    autoAttack:function(){
      var _this = this;
      if(_this.hero.autoAttack){
        setTimeout(function(){
          _this.hero.action = 'stand';
        },400);
      }
    },
    setSkills:function(skills){
      this.hero.skills = skills;
      for(var i = 0; i < skills.length; i++){
        if(skills[i].id==this.hero.skillActive) {
          this.changeSkill(skills[i]);
        }
      }
    },
    changeSkill(skill){
      this.hero.skillActive = skill.id;
      this.hero.target = skill.target;
      this.hero.dame = skill.dame;
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