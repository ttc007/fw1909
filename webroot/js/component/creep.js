Vue.component('creep', {
  // The todo-item component now accepts a
  // "prop", which is like a custom attribute.
  // This prop is called todo.
  props: ['heal', 'top' , 'left', 'creep'],
  data:function(){
  	return {
  		key:0,
  		display:""
  	}
  },
  template: `
  	<div class='creep' :style="{top:top, left:left, display:display}" v-on:click='$emit("setTargetAttack", creep)' :key='key'>{{heal}}</div>
  `,
  methods:{
  	
  },
  watch:{
  	heal:function(){
  		if(this.heal <= 0) {
  			this.display = 'none';
        this.status = 0;
        this.creep.status = 0
        this.$emit('updateCreepActtack', this.creep);
  		} else {
  			this.display = 'block';
  		}
  	},

  }
});