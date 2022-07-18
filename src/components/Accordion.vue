<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Accordion",
  data() {
    return {
      Accordion: {
        count: 0,
        activeAccordion: 0,
      },
    };
  },
  provide() {
    return { Accordion: this.Accordion };
  },
};
</script>

<style lang="scss" scoped></style>
