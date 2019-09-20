Vue.component('camera', {
  // The todo-item component now accepts a
  // "prop", which is like a custom attribute.
  // This prop is called todo.
  data: function () {
    return {
      hero:{
        name:"a",
      	heroX: 400,
      	heroY: 300,
      	target: 100,
      	dame: 40,
      	exp:0,
        expLevelUp:30,
      	level:1,
        creepTarget:{},
        creepDames:[],
        skill:true,
        action:"stand",
        autoAttack:true,
        skills:[],
        direction:" bottom",
        strength:20,
        energy:30,
        vitamin:25,
        agi:20,
        potential:0,
      },
      isShowHeroInfo:false,
      isClickIcon:false,
      mapLeft:'0px',
      mapTop: '0px',
      width: '800px',
      height:'600px',
      exp:0,
      v:.3,
      T: 1,
      i: 0,
    }
  },
  template: `<div>
        <div class="camera" :style="{width:width, height:height}" v-on:click="cameraClick">
          <div class='avatar-container'>
            <img class='hero-icon' src='webroot/img/camera/avatar.jpg' v-on:click='showHeroInfo'/>
            <p>{{hero.name}} <br>Level:{{hero.level}} - Exp: {{hero.exp}}/{{hero.expLevelUp}} </p>
            <div class='user-info' v-show='isShowHeroInfo'>
              <table>
                <tr><td>Tiềm năng</td><td>{{hero.potential}}</td><td></td></tr>
                <tr><td>Sức mạnh</td><td>{{hero.strength}}</td><td>
                  <b class='link' v-if='hero.potential>0' v-on:click='potential("strength")'>+</b></td></tr>
                <tr><td>Thân pháp</td><td>{{hero.agi}}</td><td>
                  <b class='link' v-if='hero.potential>0' v-on:click='potential("agi")'>+</b></td></tr>
                <tr><td>Nội công</td><td>{{hero.energy}}</td><td>
                  <b class='link' v-if='hero.potential>0' v-on:click='potential("energy")'>+</b></td></tr>
                <tr><td>Sinh khí</td><td>{{hero.vitamin}}</td><td>
                  <b class='link' v-if='hero.potential>0' v-on:click='potential("vitamin")'>+</b></td></tr>
              </table>
            </div>
          </div>
          
  				<map-view :top="mapTop" :left="mapLeft" :hero='hero'  
             v-on:setTargetAttack='setTargetAttack'
            :creepTarget='hero.creepTarget'
          ></map-view>
  				

          <div class='skill-container'>
            <img v-for='(skill,index) in hero.skills' :src='"webroot/img/camera/"+skill.name+".jpg"' class='skill-screen'
             :style='{right: (index*40)+"px"}' :class="{active:hero.skill_view_1==skill.skill_id}" v-on:click='changeSkill(skill)' 
             :title='skill.description'/>
          </div>
  			</div>
        
      </div>`,
  mounted () {
    this.initHero();
  },
  methods:{
    initHero:function(){
      var _this = this;
      $.ajax({
        url:'api/hero/get',
        type:'GET',
        dataType:'json',
        data:{
          id:1
        },
        success:function(data){
          _this.hero = data;
        }
      });
    },
  	cameraClick: function(e){
      var _this = this;
      var isRunning = true;
      if(e.clientY > parseInt(_this.height) - 25 || e.clientY < 60) isRunning = false;
      if(this.isShowHeroInfo && e.clientY < 180 && e.clientX < 140) isRunning = false; 

      if(isRunning){
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
              _this.mapTop = ( parseFloat(_this.mapTop) - parseFloat(_this.v*stepY/hypotenuse) )+ "px";
              _this.hero.heroY = _this.hero.heroY + parseFloat(_this.v*stepY/hypotenuse);
            } else if(Y < 0) {

              _this.mapTop =( parseFloat(_this.mapTop) + parseFloat(_this.v*stepY/hypotenuse) ) + "px";
              _this.hero.heroY = _this.hero.heroY - parseFloat(_this.v*stepY/hypotenuse);
            }

            if(X > 0 ){
              _this.mapLeft =( parseFloat(_this.mapLeft)  - parseFloat(_this.v*stepX/hypotenuse)) + "px";
              _this.hero.heroX = _this.hero.heroX + parseFloat(_this.v*stepX/hypotenuse);
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
      }
  	},
    changeSkill(skill){
      this.hero.skillActive = skill.id;
      this.hero.target = skill.target;
      this.hero.dame = skill.dame;
    },
    updateCreepAttackAfterSkill:function(){
      var _this = this;
      var dame = _this.hero.strength/5 + _this.hero.dame;
      _this.hero.exp += Math.round(_this.hero.creepTarget.exp*(dame/_this.hero.creepTarget.maxHeal));
      _this.exp = _this.hero.exp;
      _this.hero.creepTarget.heal -= dame;
    },
    setTargetAttack:function(creep){
      this.hero.creepTarget = creep;
    },
    getAround:function(){
      var _this = this;
      console.log(1123);
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
    showHeroInfo:function(){
      console.log(this.isShowHeroInfo);
      if(this.isShowHeroInfo) this.isShowHeroInfo = false;
      else this.isShowHeroInfo = true;
    },
    potential:function(attr){
      if(attr=='strength') this.hero.strength ++;
      else if(attr=='agi') this.hero.agi ++;
      else if(attr=='energy') this.hero.energy ++;
      else if(attr=='vitamin') this.hero.vitamin ++;

      this.hero.potential --;
    }
  },
  watch:{
    exp:function(exp){
      if(exp >= this.hero.expUpLevel){
        this.hero.level += 1;
        this.hero.exp = 0;
        this.exp = this.hero.exp;
        this.hero.expUpLevel = Math.round(this.hero.expUpLevel*1.1);
        this.hero.potential += 5;
      }
    }
  }
});