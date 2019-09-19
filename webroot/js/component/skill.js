Vue.component('skill', {
  // The todo-item component now accepts a
  // "prop", which is like a custom attribute.
  // This prop is called todo.
  props: ['top' , 'left', 'skillAction', 'creepTarget', 'heroX', 'heroY', 'heroTarget'],
  data:function(){
  	return {
  		key:0,
  		display:"",
      width:"8px",
      height:"8px",
      background:"#9a1b1b",
      widespread:{
        display:"none",
        background:'',
      },
      singleSkill:{
        top:"",
        left:"",
        display:"none",
      }
  	}
  },
  template: `
  	<div class='skill' style='{top:top, left:left}'>
      <div class='singleSkill' :style="{display:singleSkill.display, top:singleSkill.top, left:singleSkill.left}"></div> 
      <div class='widespread' :style="{display:widespread.display, background:widespread.background}"></div> 
    </div>
  `,
  methods:{
  	skill1:function(){
      var _this = this;
      _this.$emit('setBackground', '#456');

      setTimeout(function(){
        _this.$emit('setBackground', '#bbb');
        _this.$emit('updateCreepAttackAfterSkill');
      },400);
    },
    skill2:function(){
      var _this = this;
      _this.singleSkill.display = 'block';
      var sX = Math.abs(parseInt(_this.creepTarget.left) - _this.heroX);
      var sY = Math.abs(parseInt(_this.creepTarget.top) - _this.heroY);
      if(sX < _this.heroTarget && sY < _this.heroTarget){
        _this.singleSkill.top = "0px";
        _this.singleSkill.left = "0px";
        setTimeout(function(){
           _this.singleSkill.top = -sY/2-15 + "px";
           _this.singleSkill.left = -sX/2+2 + "px";
           setTimeout(function(){
              _this.singleSkill.display = 'none';
              _this.$emit('updateCreepAttackAfterSkill');
           }, 150);
        },150);
      }
    },
    skill3:function(){
      var _this = this;

      var sX = Math.abs(parseInt(_this.creepTarget.left) - _this.heroX);
      var sY = Math.abs(parseInt(_this.creepTarget.top) - _this.heroY);
      if(sX < _this.heroTarget && sY < _this.heroTarget){
        _this.widespread.display = 'block';
        _this.widespread.background = '#a23434';
        setTimeout(function(){
          _this.widespread.background = '#ab0707';
          setTimeout(function(){
            _this.widespread.display = 'none';
            _this.$emit('updateCreepAttackAfterSkill');
          },400);
        }, 400);
      }
    }
  },
  watch:{
  	skillAction:function(skillAction){
      if(skillAction==1) this.skill1();
      else if(skillAction==2) this.skill2();
      else if(skillAction==3) this.skill3();
    }

  }
});