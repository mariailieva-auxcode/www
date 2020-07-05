<template>
  <link-prevue :url="data.url" cardWidth="100%">
    <template slot-scope="props">
      <div id="main-news-card" class="card" :class="{'main-card': isMain}">
          <a :href="props.url">
            <img id="box-image" class="card-img-top" :src="props.img" :alt="props.title" />
          </a>
          <p class="news-tag" :class="{'inverted': data.tag === 'PROJECT DEVELOPER'}">{{data.tag}}</p>
          <p :class="{'main-news': isMain, 'sec-news': !isMain}">{{ data.description }}</p>
          <h4 class="card-title">{{props.title}}</h4>
      </div>
    </template>
  </link-prevue>
</template>

<script>
import LinkPrevue from "link-prevue";
export default {
  name: "GeneralNewsBlock",
  components: {
    LinkPrevue
  },
  props: {
    data: Object,
    isMain: Boolean
  }
};
</script>

<style lang="scss" scoped>
img#box-image {
    border-radius: 10px;
}
</style>