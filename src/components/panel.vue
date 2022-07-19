<template>
  <div class="panel">
    <div
      class="panel-heading"
      @click="openAccordion"
      :aria-expanded="visible ? true : false"
    >
      <slot name="heading"></slot>
      <i class="collapse-handle"></i>
    </div>
    <transition
      type="animation"
      name="collapsible"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end"
    >
      <div class="panel-body" v-show="visible">
        <div class="body-area">
          <slot name="body"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Panel",
  props: {},
  inject: ["Accordion"], 
  data() {
    return {
      index: null,
      maxHeightValue : 0
    };
  },
  computed: {
    visible() {
      return this.index == this.Accordion.activeAccordion;
    },
  },
  methods: {
    openAccordion() {
      if (this.visible) {
        this.Accordion.activeAccordion = null;
      } else {
        this.Accordion.activeAccordion = this.index;
      }
    },
    start(el) {      
      el.style.maxHeight = el.scrollHeight + "px";
    },
    end(el) {
      el.style.maxHeight = "";
    },
  },
  created() {
    this.index = this.Accordion.count++;
  },
};
</script>

<style lang="scss" scoped>
.collapsible-enter-active,
.collapsible-leave-active {
  will-change: max-height, opacity;  
  transition: max-height 0.2s ease-out, opacity 0.2s ease-out;
  overflow: hidden;
}

.collapsible-enter,
.collapsible-leave-to {
  max-height: 0 !important;
  opacity: 0;
}
</style>
