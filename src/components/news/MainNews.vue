<template>
  <link-prevue v-if="!!data" :url="data.url" cardWidth="100%">
    <template slot-scope="props">
      <a :href="props.url" class="card-link" target="_blank">
        <div id="main-news-card" class="card" :class="{'main-card': isMain}">
          <img id="box-image" class="card-img-top" :src="props.img" :alt="props.title" />

          <p
            class="news-tag"
            :class="{'inverted': data.group.includes('project developer')}"
          >{{ tag | uppercase}}</p>
          <p :class="{'main-news': isMain, 'sec-news': !isMain}">{{ props.title }}</p>
          <h4 class="card-title">{{data.description}}</h4>
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
      if (text) return text.toUpperCase();
    },
  },
  data() {
    return {
      tag: "",
    };
  },
  components: {
    LinkPrevue,
  },
  props: {
    data: Object,
    isMain: Boolean,
  },
  mounted() {
    if (this.data) {
      if (this.data.group.includes("project developer")) {
        this.tag = "PROJECT DEVELOPER";
      } else if (this.data.group.includes("site owner")) {
        this.tag = "SITE OWNER";
      } else if (this.data.group.includes("specialists")) {
        this.tag = "SPECIALISTS";
      }
    }
  },
};
</script>
