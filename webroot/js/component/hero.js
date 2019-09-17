Vue.component('hero', {
  // The todo-item component now accepts a
  // "prop", which is like a custom attribute.
  // This prop is called todo.
  props: ['heal', 'type', 'dame', 'top', 'left', 'hero'],
  template: `<div class='hero' :style="{top:top, left:left, background:hero.background}"></div>`,
});