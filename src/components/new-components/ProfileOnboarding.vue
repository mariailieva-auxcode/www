<template>
  <div class="profile-onboarding">
    <div v-if="step === 1">
      <p>Agriculture</p>
      <div class="style">
        <div class="toggles">
          <button
            class="step1choice1 style"
            :class="{ active: step1choice1 }"
            @click="
              (step1choice1 = !step1choice1),
                (step1choice2 = false),
                (step1choice3 = false),
                (step1choice4 = false)
            "
          >
            Diary
          </button>
          <button
            class="step1choice2 style"
            :class="{ active: step1choice2 }"
            @click="
              (step1choice2 = !step1choice2),
                (step1choice1 = false),
                (step1choice3 = false),
                (step1choice4 = false)
            "
          >
            Livestrock
          </button>
          <button
            class="step1choice3 style"
            :class="{ active: step1choice3 }"
            @click="
              (step1choice3 = !step1choice3),
                (step1choice1 = false),
                (step1choice2 = false),
                (step1choice4 = false)
            "
          >
            Crops
          </button>
          <button
            class="step1choice4 style"
            :class="{ active: step1choice4 }"
            @click="
              (step1choice4 = !step1choice4),
                (step1choice1 = false),
                (step1choice2 = false),
                (step1choice3 = false)
            "
          >
            Hortery (tuinbouw)
          </button>
        </div>
      </div>
    </div>

    <!-- Step 2 -->

    <div v-if="step === 2">
      <p>Public</p>
      <div class="style">
        <div class="toggles">
          <button
            class="step2choice1 style"
            :class="{ active: step2choice1 }"
            @click="
              (step2choice1 = !step2choice1),
                (step2choice2 = false),
                (step2choice3 = false),
                (step2choice4 = false),
                (step2choice5 = false),
                (step2choice6 = false)
            "
          >
            Infrastructure along roads, rails, verges, tunnels
          </button>
          <button
            class="step2choice2 style"
            :class="{ active: step2choice2 }"
            @click="
              (step2choice2 = !step2choice2),
                (step2choice1 = false),
                (step2choice3 = false),
                (step2choice4 = false),
                (step2choice5 = false),
                (step2choice6 = false)
            "
          >
            rooftop public real estate
          </button>
          <button
            class="step2choice3 style"
            :class="{ active: step2choice3 }"
            @click="
              (step2choice3 = !step2choice3),
                (step2choice1 = false),
                (step2choice2 = false),
                (step2choice4 = false),
                (step2choice5 = false),
                (step2choice6 = false)
            "
          >
            refuse dumps
          </button>
          <button
            class="step2choice4 style"
            :class="{ active: step2choice4 }"
            @click="
              (step2choice4 = !step2choice4),
                (step2choice1 = false),
                (step2choice2 = false),
                (step2choice3 = false),
                (step2choice5 = false),
                (step2choice6 = false)
            "
          >
            parking lots
          </button>
          <button
            class="step2choice5 style"
            :class="{ active: step2choice5 }"
            @click="
              (step2choice5 = !step2choice5),
                (step2choice1 = false),
                (step2choice2 = false),
                (step2choice3 = false),
                (step2choice4 = false),
                (step2choice6 = false)
            "
          >
            transportation sites
          </button>
          <button
            class="step2choice6 style"
            :class="{ active: step2choice6 }"
            @click="
              (step2choice6 = !step2choice6),
                (step2choice1 = false),
                (step2choice2 = false),
                (step2choice3 = false),
                (step2choice4 = false),
                (step2choice5 = false)
            "
          >
            other
          </button>
        </div>
      </div>
    </div>

    <!-- Step 3 -->

    <div v-if="step === 3">
      <p>Residential</p>
      <div class="toggles">
        <button
          class="step3choice1 style"
          :class="{ active: step3choice1 }"
          @click="
            (step3choice1 = !step3choice1),
              (step3choice2 = false),
              (step3choice3 = false),
              (step3choice4 = false)
          "
        >
          housing cooperations
        </button>
        <button
          class="step3choice2 style"
          :class="{ active: step3choice2 }"
          @click="
            (step3choice2 = !step3choice2),
              (step3choice1 = false),
              (step3choice3 = false),
              (step3choice4 = false)
          "
        >
          private owners
        </button>
        <button
          class="step3choice3 style"
          :class="{ active: step3choice3 }"
          @click="
            (step3choice3 = !step3choice3),
              (step3choice1 = false),
              (step3choice2 = false),
              (step3choice4 = false)
          "
        >
          real estate owners project development housing
        </button>
        <button
          class="step3choice4 style"
          :class="{ active: step3choice4 }"
          @click="
            (step3choice4 = !step3choice4),
              (step3choice1 = false),
              (step3choice2 = false),
              (step3choice3 = false)
          "
        >
          alternative livings (campsite, recreational etc.)
        </button>
      </div>
    </div>

    <!-- Step 4 -->

    <div v-if="step === 4">
      <p>Commercial</p>
      <div class="toggles">
        <button
          class="step4choice1 style"
          :class="{ active: step4choice1 }"
          @click="
            (step4choice1 = !step4choice1),
              (step4choice2 = false),
              (step4choice3 = false),
              (step4choice4 = false)
          "
        >
          Shopping
        </button>
        <button
          class="step4choice2 style"
          :class="{ active: step4choice2 }"
          @click="
            (step4choice2 = !step4choice2),
              (step4choice1 = false),
              (step4choice3 = false),
              (step4choice4 = false)
          "
        >
          Business district
        </button>
        <button
          class="step4choice3 style"
          :class="{ active: step4choice3 }"
          @click="
            (step4choice3 = !step4choice3),
              (step4choice1 = false),
              (step4choice2 = false),
              (step4choice4 = false)
          "
        >
          Offices
        </button>
        <button
          class="step4choice4 style"
          :class="{ active: step4choice4 }"
          @click="
            (step4choice4 = !step4choice4),
              (step4choice1 = false),
              (step4choice2 = false),
              (step4choice3 = false)
          "
        >
          Distribution centers
        </button>
      </div>
    </div>

    <!-- Step 5 -->

    <div v-if="step === 5">
      <p>Industrial zones</p>
      <div class="toggles">
        <button
          class="step5choice1 style"
          :class="{ active: step5choice1 }"
          @click="
            (step5choice1 = !step5choice1),
              (step5choice2 = false),
              (step5choice3 = false)
          "
        >
          light industrial (innovation, food, microchips etc.)
        </button>
        <button
          class="step5choice2 style"
          :class="{ active: step5choice2 }"
          @click="
            (step5choice2 = !step5choice2),
              (step5choice1 = false),
              (step5choice3 = false)
          "
        >
          heavy industrial zone (bulk, resources, mining)
        </button>
        <button
          class="step5choice3 style"
          :class="{ active: step5choice3 }"
          @click="
            (step5choice3 = !step5choice3),
              (step5choice1 = false),
              (step5choice2 = false)
          "
        >
          Seaports Airports
        </button>
      </div>
    </div>

    <!-- Step 6 -->

    <div v-if="step === 6">
      <p>Nature</p>
      <div class="toggles">
        <button
          class="step6choice1 style"
          :class="{ active: step6choice1 }"
          @click="
            (step6choice1 = !step6choice1),
              (step6choice2 = false),
              (step6choice3 = false),
              (step6choice4 = false)
          "
        >
          Foresty
        </button>
        <button
          class="step6choice2 style"
          :class="{ active: step6choice2 }"
          @click="
            (step6choice2 = !step6choice2),
              (step6choice1 = false),
              (step6choice3 = false),
              (step6choice4 = false)
          "
        >
          Ecological zones
        </button>
        <button
          class="step6choice3 style"
          :class="{ active: step6choice3 }"
          @click="
            (step6choice3 = !step6choice3),
              (step6choice1 = false),
              (step6choice2 = false),
              (step6choice4 = false)
          "
        >
          Natural protected zones
        </button>
        <button
          class="step6choice4 style"
          :class="{ active: step6choice4 }"
          @click="
            (step6choice4 = !step6choice4),
              (step6choice1 = false),
              (step6choice2 = false),
              (step6choice3 = false)
          "
        >
          recreational zones
        </button>
      </div>
    </div>

    <!-- Step 7 -->

    <div v-if="step === 7">
      <p>Water</p>
      <div class="toggles">
        <button
          class="step7choice1 style"
          :class="{ active: step7choice1 }"
          @click="
            (step7choice1 = !step7choice1),
              (step7choice2 = false),
              (step7choice3 = false)
          "
        >
          Lakes
        </button>
        <button
          class="step7choice2 style"
          :class="{ active: step7choice2 }"
          @click="
            (step7choice2 = !step7choice2),
              (step7choice1 = false),
              (step7choice3 = false)
          "
        >
          greenhouse basins
        </button>
        <button
          class="step7choice3 style"
          :class="{ active: step7choice3 }"
          @click="
            (step7choice3 = !step7choice3),
              (step7choice1 = false),
              (step7choice2 = false)
          "
        >
          Rivers
        </button>
      </div>
    </div>
    <div>
      <button v-if="step !== 1" @click="step--">back</button>
      <button v-if="step !== 7" @click="step++">next</button>
      <button v-if="step === 7" @click="nextStep()">Next Step</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      step1choice1: false,
      step1choice2: false,
      step1choice3: false,
      step1choice4: false,
      step2choice1: false,
      step2choice2: false,
      step2choice3: false,
      step2choice4: false,
      step2choice5: false,
      step2choice6: false,
      step3choice1: false,
      step3choice2: false,
      step3choice3: false,
      step3choice4: false,
      step4choice1: false,
      step4choice2: false,
      step4choice3: false,
      step4choice4: false,
      step5choice1: false,
      step5choice2: false,
      step5choice3: false,
      step6choice1: false,
      step6choice2: false,
      step6choice3: false,
      step6choice4: false,
      step7choice1: false,
      step7choice2: false,
      step7choice3: false,
    };
  },
  methods: {
    nextStep() {
      this.$emit("nextStep");
      this.$emit("close");
      this.$emit("stepsColor");
    },
  },
};
</script>

<style lang="scss">
@import "profile-style.scss";
.toggles {
  button {
    &.style {
      margin-left: 0;
    }
  }
}
</style>