<template>
  <div style="font-family: serif" class="news">
    <div class="row">
      <div :class="{'hidden' : !data.isShown}">
        <link-prevue :url="data.url" cardWidth="100%">
          <template slot-scope="props">
            <div id="Tert-card" class="card">
              <div>
                <a :href="props.url" class="card-btn">
                  <img
                    id="tert-card-image"
                    class="card-img-top"
                    :src="props.img"
                    :alt="props.title"
                  />
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
  name: "TertNews",
  components: {
    LinkPrevue
  },
  props: {
    data: Object
  }
};
</script>
