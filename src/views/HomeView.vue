<script setup lang="ts">
import { gsap } from "gsap";
import { ref, onMounted } from "vue";
import { SplitText } from "gsap/SplitText";

const headingRef = ref<HTMLElement | null>(null);
const imageRef = ref<HTMLElement | null>(null);

const animateText = () => {
  gsap.registerPlugin(SplitText);

  const headingSplit = SplitText.create(headingRef.value, {
    type: "chars",
  });

  // Nothing floats and nothing is decorated: the ground settles in, then the
  // statement rises into place on a tight stagger — no scatter, no colour shift.
  const tl = gsap.timeline();

  tl.from(imageRef.value, {
    duration: 1.1,
    opacity: 0,
    scale: 1.04,
    ease: "power2.out",
  });

  tl.from(headingSplit.chars, {
    duration: 0.5,
    y: 24,
    opacity: 0,
    ease: "power3.out",
    stagger: 0.012,
  }, "-=0.75");
};

onMounted(() => {
  animateText();
});
</script>

<template>
  <!-- The photograph is the ground; the statement sits on it, flush left. -->
  <main class="relative flex flex-1 items-center overflow-hidden">
    <div class="hero-photo grayscale" ref="imageRef">
      <img
        src="../assets/img/facade.jpg"
        alt="Fachada de una casa moderna de dos plantas con piscina, al atardecer"
      />
    </div>
    <div class="hero-scrim"></div>

    <section class="relative mx-auto w-full max-w-7xl px-4 py-16">
      <div class="max-w-2xl">
        <p class="card-kicker">Realm Properties</p>

        <h1 class="mt-2 text-4xl md:text-6xl" ref="headingRef">
          Arquitectura para vivir
        </h1>

        <p class="text-muted mt-4 max-w-prose">
          Una selección de propiedades con carácter: obra moderna, materiales
          honestos y emplazamientos que importan.
        </p>

        <div class="mt-6 flex flex-wrap gap-3">
          <button type="button" class="btn btn-primary">Ver propiedades</button>
          <router-link to="/contact" class="btn btn-secondary">Contacto</router-link>
        </div>
      </div>
    </section>

    <p class="text-muted absolute bottom-3 left-4 text-[11px]">
      Residencia moderna con piscina, al atardecer.
    </p>
  </main>
</template>
