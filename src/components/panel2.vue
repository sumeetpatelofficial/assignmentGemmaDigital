<template>
  <div class="panel">
    <div class="panel-heading">
      <slot name="heading"></slot>
      <i class="collapse-handle"></i>
    </div>
    <div class="panel-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    collapsiblePanel() {
      var accordion = document.getElementsByClassName("panel");
      for (let i = 0; i < accordion.length; i++) {
        accordion[i].addEventListener("click", function (event) {
          var targetClicked = event.target;
          var classClicked = targetClicked.classList;
          while (classClicked[0] != "panel-heading") {
            targetClicked = targetClicked.parentElement;
            classClicked = targetClicked.classList;
          }
          var description = targetClicked.nextElementSibling;
          if (description.style.maxHeight) {
            description.style.maxHeight = null;
            targetClicked.setAttribute("aria-expanded", "false");
          } else {
            var allDescriptions = document.getElementsByClassName("panel-body");
            for (var i = 0; i < allDescriptions.length; i++) {
              if (allDescriptions[i].style.maxHeight) {
                allDescriptions[i].style.maxHeight = null;
                allDescriptions[i].previousElementSibling.setAttribute(
                  "aria-expanded",
                  "false"
                );
              }
            }
            description.style.maxHeight = description.scrollHeight + "px";
            targetClicked.setAttribute("aria-expanded", "true");
          }
        });
      }
    },
  },
  mounted() {
    this.collapsiblePanel();
  },
};
</script>

<style lang="scss" scoped>
.panel-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}
.panel{
    &.active{
    .panel-body{        
            max-height: 100%;
        }
    }
}
</style>
