<template>
  <div
    :id="containerId"
    class="perspective-outer"
    @mousemove="onMouseMoveHandler"
    @mouseout="onMouseLeaveHandler"
    @mouseenter="onMouseEnterHandler"
  >
    <div :id="innerId" :class="classes" class="perspective-inner">
      <slot></slot>
    </div>
  </div>
</template>
  
<script>
var counter = 0;
var refreshRate = 10;
var inner = null;
var container = null;
export default {
  props: ['classes'],
  data() {
    return {
      x: 0,
      y: 0,
      x_: 0,
      y_: 0,
      innerId: this.uid(),
      containerId: this.uid(),
    };
  },
  mounted() {
    container = document.getElementById(this.containerId);
    inner = document.getElementById(this.innerId);
    this.setOrigin(container);
  },
  methods: {
    uid() {
      return Math.random().toString(36).substring(2);
    },
    updatePosition(event) {
      const e = event || window.event;
      const { top, left } = inner.getBoundingClientRect();
      this.x = e.clientX - left - this.x_;
      this.y = (e.clientY - top - this.y_) * -1;
    },
    setOrigin(event) {
      this.x_ = event.offsetLeft + Math.floor(event.offsetWidth / 2);
      this.y_ = event.offsetTop + Math.floor(event.offsetHeight / 2);
    },
    isTimeToUpdate() {
      return counter++ % refreshRate === 0;
    },
    update(event) {
      this.updatePosition(event);
      this.updateTransformStyle(
        this.y / inner.offsetHeight / 2,
        this.x / inner.offsetWidth / 2,
      );
    },
    updateTransformStyle(x, y) {
      const style = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg)';
      inner.style.transform = style;
    },
    onMouseEnterHandler(event) {
      container = document.getElementById(this.containerId);
      inner = document.getElementById(this.innerId);
      this.setOrigin(container);
      this.update(event);
    },
    onMouseLeaveHandler() {
      inner.style.transform = '';
    },
    onMouseMoveHandler(event) {
      if (this.isTimeToUpdate()) {
        this.update(event);
      }
    },
  },
};
</script>
  
<style>
.perspective-outer {
  perspective: 18px;
}
.perspective-inner {
  transition: transform 0.3s;
}
</style>