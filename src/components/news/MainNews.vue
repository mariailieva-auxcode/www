<template>
  <GeneralNewsBlock :data="data" :isMain="isMain" v-show="data.isShown"></GeneralNewsBlock>
</template>

<script>
import GeneralNewsBlock from "./GeneralNewsBlock";
export default {
  name: "MainNews",
  components: {
    GeneralNewsBlock
  },
  props: {
    data: Object,
    isMain: Boolean
  }
};
</script>
