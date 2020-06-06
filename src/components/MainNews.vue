<template>
  <div style="font-family: serif" class="news">
    <div class="row">
      <div v-show="data.isShown">
        <link-prevue :url="data.url" cardWidth="100%">
          <template slot-scope="props">
            <div id="main-news-card" class="card" :class="{'main-card': isMain}">
              <div>
                <a :href="props.url">
                  <img id="box-image" class="card-img-top" :src="props.img" :alt="props.title" />
                </a>
                <p class="mainNews">{{ data.description }}</p>
                <h4 class="card-title">{{props.title}}</h4>
              </div>
            </div>
          </template>
        </link-prevue>
      </div>
    </div>
  </div>
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
