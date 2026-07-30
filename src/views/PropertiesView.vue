<script setup lang="ts">
import { gsap } from "gsap";
import { ref, onMounted } from "vue";
import { properties, formatPropertyPrice } from "../data/properties";
import type { PropertyStatus } from "../types/property";

const gridRef = ref<HTMLElement | null>(null);

// The accent carries meaning here: only an available listing gets it.
const statusTag = (status: PropertyStatus): string => {
  if (status === "available") return "tag-accent";
  if (status === "reserved") return "tag-outline";
  return "tag-neutral";
};

// Same grammar as the hero: a straight rise on a tight stagger, nothing
// floating in from the side and nothing scaling.
const animateCards = () => {
  if (!gridRef.value) return;

  gsap.from(gridRef.value.children, {
    duration: 0.6,
    y: 32,
    opacity: 0,
    ease: "power3.out",
    stagger: 0.08,
  });
};

onMounted(() => {
  animateCards();
});
</script>

<template>
  <main class="mx-auto w-full max-w-7xl flex-1 px-4 py-12">
    <div class="max-w-3xl">
      <p class="card-kicker">Curated portfolio</p>
      <h1 class="mt-2 text-4xl md:text-5xl">Properties</h1>
      <p class="text-muted mt-4 max-w-prose">
        A focused collection of homes chosen for location, character, and
        long-term value.
      </p>
    </div>

    <hr class="hr" />

    <!-- Modular grid: equal-width cells, visible structure. -->
    <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3" ref="gridRef">
      <article
        v-for="property in properties"
        :key="property.id"
        class="card gap-0 p-0"
      >
        <div class="grayscale">
          <img
            :src="property.heroImage"
            :alt="property.title"
            class="h-56 w-full object-cover"
          />
        </div>

        <div class="flex flex-1 flex-col gap-2 p-4">
          <div class="flex items-center justify-between gap-3">
            <span class="tag" :class="statusTag(property.status)">
              {{ property.status }}
            </span>
            <span class="card-meta">{{ property.type }}</span>
          </div>

          <h2 class="card-title">{{ property.title }}</h2>
          <p class="card-meta">{{ property.location }}</p>

          <p class="text-xl font-semibold">
            {{ formatPropertyPrice(property) }}
          </p>

          <dl class="mt-2 grid grid-cols-3 gap-3 border-t-2 border-divider pt-3">
            <div>
              <dt class="text-muted text-[11px] uppercase tracking-[0.08em]">Beds</dt>
              <dd class="text-sm">{{ property.bedrooms }}</dd>
            </div>
            <div>
              <dt class="text-muted text-[11px] uppercase tracking-[0.08em]">Baths</dt>
              <dd class="text-sm">{{ property.bathrooms }}</dd>
            </div>
            <div>
              <dt class="text-muted text-[11px] uppercase tracking-[0.08em]">Sq ft</dt>
              <dd class="text-sm">{{ property.areaSqFt.toLocaleString() }}</dd>
            </div>
          </dl>

          <p class="card-body mt-2">{{ property.summary }}</p>

          <router-link
            :to="`/properties/${property.slug}`"
            class="btn btn-secondary btn-block"
          >
            View Details
          </router-link>
        </div>
      </article>
    </div>
  </main>
</template>
