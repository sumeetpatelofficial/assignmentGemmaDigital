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
      name="collapsible"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end"
    >
      <div class="panel-body" v-show="visible">
        <slot name="body"></slot>
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
      console.log(el);
      el.style.height = el.scrollHeight + "px";
    },
    end(el) {
      el.style.height = "";
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
  will-change: height, opacity, display;
  height: fit-content;
  transition: height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.collapsible-enter,
.collapsible-leave-to {
  height: 0 !important;
  opacity: 0;
}
</style>
