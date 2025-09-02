<script setup lang="ts">
import HeaderComponent from "../components/HeaderComponent.vue";
import { gsap } from "gsap";
import { ref, onMounted } from "vue";
import { SplitText } from 'gsap/SplitText'

const subtitleRef = ref<HTMLElement | null>(null);
const imageRef = ref<HTMLElement | null>(null);

const animateText = () => {
  gsap.registerPlugin(SplitText);

  let subtitleSplit = SplitText.create(subtitleRef.value, {
  type: "chars",
  });

  let charsTl = gsap.timeline();
  
  subtitleSplit.chars.forEach((char, index) => {

    gsap.from(char, {
      duration: 0.75,
      y: gsap.utils.random(-150, 150),
      x: gsap.utils.random(-300, 300),
      rotate: gsap.utils.random(-360, 360),
      scale: gsap.utils.random(0, 2),
      ease: "back.out",
      color: "#5F7CE0",
      opacity: 0,
      delay: index * 0.01,
    });
  })
  charsTl.from(imageRef.value, {
    delay: 1,
    duration: 0.75,
    x: -150,
    ease: "power.out",
    opacity: 0,
  });
}

onMounted(() => {
  animateText();
});
</script>

<template>
  <HeaderComponent />
  <main class="flex flex-col items-center justify-center min-h-screen">
    <div class="card flex">
      <h1 class="text-6xl text-black font-ancient" ref="subtitleRef">
        "Gaze upon the arcane emergence of Claudia's real estate realm, forged
        from the void"
      </h1>
    </div>

    <img
      class="mr-24"
      src="https://www.shutterstock.com/image-vector/work-progress-coming-soon-icon-600nw-2492263749.jpg"
      alt="work in progress"
      ref="imageRef"
    />
  </main>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
