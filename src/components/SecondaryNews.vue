<template>
  <div style="font-family: serif" class="news">
    <div class="row">
      <div v-show="data.isShown">
        <link-prevue :url="data.url" cardWidth="100%">
          <template slot-scope="props">
            <div id="secondary-box-card" class="card row" :class="{'main-card': isMain}">
              <div class="col-7 secondary-box-image">
                <div>
                  <a :href="props.url" class="card-btn">
                    <img
                      id="secondary-box-image"
                      class="card-img-top"
                      :src="props.img"
                      :alt="props.title"
                    />
                  </a>
                </div>
              </div>
              <div class="col-5 secondary-box-text">
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
  name: "SecondaryNews",
  components: {
    LinkPrevue
  },
  props: {
    data: Object,
    isMain: Boolean
  }
};
</script>
