Vue.component('camera', {
  // The todo-item component now accepts a
  // "prop", which is like a custom attribute.
  // This prop is called todo.
  data: function () {
    return {
      hero:{
      	heroX: 400,
      	heroY: 300,
      	target: 50,
      	background:"#bbb",
      	dame: 30,
      	exp:0,
      	level:1
      },
      creepActtack:null,
      isActtack:false,
      mapLeft:'0px',
      mapTop: '0px',
      width: '800px',
      height:'600px',
      v:.3,
      T: 1,
      i: 0
    }
  },
  template: `<div class="camera" :style="{width:width, height:height}" v-on:click="cameraClick">
  				<map-view :top="mapTop" :left="mapLeft" :hero='hero'  v-on:heroSkillMap='heroSkill' :creepActtack='creepActtack' :isActtack='isActtack'></map-view>
  				<hero :hero='hero'></hero>
  			</div>`,
  methods:{
  	cameraClick: function(e){
  		var _this = this;
  		var X = e.clientX - parseInt(_this.width)/2 ;
  		var Y = e.clientY - parseInt(_this.height)/2;
  		if(window.myInterval != undefined && window.myInterval != 'undefined'){
		    window.clearInterval(window.myInterval);
		}
		var stepX = Math.abs(X);
		var stepY = Math.abs(Y);
		var hypotenuse = Math.round(Math.sqrt(stepX*stepX + stepY*stepY));

		var t = hypotenuse/_this.v;
		_this.i = 0 ;

  		window.myInterval = setInterval(function(){
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
  			if(_this.i>=t) window.clearInterval(window.myInterval);
		}, _this.T );
  	},
  	heroSkill:function(creep){
  		if(creep.status == 1){
  			var _this = this;

	  		_this.isActtack = true;

		  	_this.hero.background = "#123";
		  	setTimeout(function(){
		  		_this.hero.background = "#456";
		  		setTimeout(function(){
		  			_this.creepActtack = creep;
		  			_this.creepActtack.heal -= _this.hero.dame;
		  			_this.hero.background = "#bbb";
		  			setTimeout(function(){
		  				if(_this.creepActtack.heal > 0){
		  					_this.heroSkill(creep);
		  				} else {
		  					_this.isActtack = false;
		  					_this.creepActtack.status = 0;
		  				}
		  			},500);
		  		},300);
		  	}, 300);
  		}
  	}
  }
});