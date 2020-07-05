<template>
  <link-prevue :url="data.url" cardWidth="100%">
    <template slot-scope="props">
      <a :href="props.url" class="card-link">
        <div id="main-news-card" class="card" :class="{'main-card': isMain}">
          <img id="box-image" class="card-img-top" :src="props.img" :alt="props.title" />
          
          <p class="news-tag" :class="{'inverted': data.tag === 'PROJECT DEVELOPER'}">{{data.tag}}</p>
          <p :class="{'main-news': isMain, 'sec-news': !isMain}">{{ data.description }}</p>
          <h4 class="card-title">{{props.title}}</h4>
        </div>
      </a>
    </template>
  </link-prevue>
</template>

<script>
import LinkPrevue from "link-prevue";
export default {
  name: "MainNews",
  components: {
    LinkPrevue
  },
  props: {
    data: Object,
    isMain: Boolean
  }
};
</script>
