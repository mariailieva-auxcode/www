<template>
  <div class="container" id="team">
    <div class="team">
      <div class="col-12">
        <h1>{{ title }}</h1>
      </div>
      <div class="row team-content">
        <div
          class="col-12 col-sm-12 col-md-6 col-xl-4 team-info-card"
          v-for="member of team.team"
          :key="member.image"
        >
          <div class="style-card">
            <img class="member-image" :src="member.image" />
            <h2>{{ member.name }}</h2>
            <p>{{ member.information }}</p>
            <div class="row links">
              <a :href="`mailto:${member.email}`"
                ><img class="first-link" src="/assets/envelope.svg" />
              </a>
              <a :href="member.linkedin" target="_blank"
                ><img src="/assets/linkedin.svg"
              /></a>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-12 col-md-6 col-xl-4 team-info-card">
          <div
            v-for="(contact, i) of contact.contact"
            :key="i"
            class="style-card"
          >
            <img class="member-image" src="/assets/team-you.png" />
            <h2>{{ contact.label }}</h2>
            <p>
              {{ contact.information }}
            </p>
            <a
              v-for="(button, i) of contact.button"
              :key="i"
              :href="`mailto:${button.link}`"
            >
              <button>
                {{ button.text }}
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import team from "@content/nl/general/team.yaml";
import teamEn from "@content/en/general/team.yaml";
export default {
  name: "OurTeam",
  data() {
    return {
      team: {},
      contact: {},
      title: "",
    };
  },
  props: {
    lang: String,
  },
  mounted() {
    this.init();
  },
  watch: {
    lang() {
      this.init();
    },
  },
  methods: {
    init() {
      let data = this.lang === "en" ? teamEn : team;
      this.team = data;
      this.contact = data;
      this.title = data.title;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@styles/newmain.scss";
.team {
  .team-content {
    display: flex;
    align-items: center;
    margin-top: 65px;
    h1 {
      font-size: 45px;
      margin: 0;
      color: #26272e;
      text-align: left;
      &.different-color {
        margin: 15px 0;
        color: #55b364;
      }
    }
    @media only screen and (min-width: 2000px) {
      > .team-info-card {
        height: 640px !important;
        > .style-card {
          padding: 50px 40px 30px !important;
        }
      }
    }
    @media only screen and (max-width: 1200px) {
      .team-labels {
        display: none;
      }
    }
    .team-info-card {
      height: 710px;
      margin-bottom: 45px;
      > .style-card {
        display: flex;
        flex-direction: column;
        padding: 50px 25px 30px;
        min-height: 550px;
        height: 100%;

        img {
          margin: 0 auto;
        }

        button {
          padding: 14px 69px;
          margin-top: 20px;
          background-color: #55b364;
          border-radius: 10px;
          border: none;
          outline: none;
          color: white;
          font-weight: 500;
          font-size: 14px;
        }
      }
      .member-image {
        max-width: 200px;
        max-height: 200px;
        width: 100%;
      }
      h2 {
        margin: 15px 0 15px;
      }
      .links {
        display: flex;
        justify-content: center;
        margin-bottom: 0;
        .first-link {
          margin-right: 15px;
        }
      }
    }
    @media only screen and (max-width: 375px) {
      .team-info-card {
        height: 800px;
      }
    }
  }
}
</style>