Vue.component('creep', {
  // The todo-item component now accepts a
  // "prop", which is like a custom attribute.
  // This prop is called todo.
  props: ['heal', 'type', 'dame', 'status', 'top' , 'left', 'heroX', 'heroY', 'heroTarget' , 'creep'],
  data:function(){
  	return {
  		key:0,
  		display:""
  	}
  },
  template: `
  	<div class='creep' :style="{top:top, left:left, display:display}" v-on:click='creepClick' :key='key'>{{heal}}</div>
  `,
  methods:{
  	creepClick:function(e){
		console.log(this.creep);
		var sX = Math.abs(parseInt(this.left) - this.heroX);
  		var sY = Math.abs(parseInt(this.top) - this.heroY);
  		if(sX < this.heroTarget && sY < this.heroTarget){
  			this.$emit('actack', this.creep);
  		}
  	}
  },
  watch:{
  	heroX:function(){
  		var sX = Math.abs(parseInt(this.left) - this.heroX);
  		var sY = Math.abs(parseInt(this.top) - this.heroY);
  		if(sX < this.heroTarget && sY < this.heroTarget){
  			this.$emit('actack', this.creep);
  		}
  	},
  	heroY:function(){
  		var sX = Math.abs(parseInt(this.left) - this.heroX);
  		var sY = Math.abs(parseInt(this.top) - this.heroY);
  		if(sX < this.heroTarget && sY < this.heroTarget){
  			this.$emit('actack', this.creep);
  		}
  	},
  	heal:function(){
  		if(this.heal <= 0) {
  			this.display = 'none';
  		} else {
  			this.display = 'block';
  		}
  	},

  }
});