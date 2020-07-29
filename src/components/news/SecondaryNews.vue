<template>
  <link-prevue :url="data.url" cardWidth="100%">
    <template slot-scope="props">
      <a :href="props.url" class="card-link" target="_blank">
        <div id="secondary-news-card" class="card">
          <img id="box-image" class="card-img-top" :src="props.img" :alt="props.title" />

          <div>
            <p class="sec-news">{{ props.title }}</p>
            <h4 class="card-title">{{data.description}}</h4>
          </div>
        </div>
      </a>
    </template>
  </link-prevue>
</template>

<script>
import LinkPrevue from "link-prevue";
export default {
  name: "SecondaryNews",
  components: {
    LinkPrevue,
  },
  props: {
    data: Object,
  },
};
</script>

<style lang="scss" scoped>
#secondary-news-card.card {
  display: flex;
  flex-direction: row;

  img {
    width: 150px;
    margin-right: 15px;
    height: 150px;
    object-fit: cover;
  }
}
</style>
