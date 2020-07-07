<template>
  <link-prevue :url="data.url" cardWidth="100%">
    <template slot-scope="props">
      <a :href="props.url" class="card-link" target="_blank">
        <div id="main-news-card" class="card" :class="{'main-card': isMain}">
          <img id="box-image" class="card-img-top" :src="props.img" :alt="props.title" />
          
          <p class="news-tag" :class="{'inverted': data.categories.includes('project developer')}">{{ tag | uppercase}}</p>
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
  filters: {
    uppercase(text) {
      if(text)
        return text.toUpperCase()
    }
  },
  data() {
    return {
      tag: ""
    }
  },
  components: {
    LinkPrevue
  },
  props: {
    data: Object,
    isMain: Boolean
  },
  created() {
    if(this.data.categories.includes('project developer')) {
      this.tag = 'PROJECT DEVELOPER'
    } else if(this.data.categories.includes('site owner')) {
      this.tag = 'SITE OWNER'
    }
  }
};
</script>
