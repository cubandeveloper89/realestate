<script setup lang="ts">
import { computed } from "vue";
import { findPropertyBySlug, formatPropertyPrice } from "../data/properties";

const props = defineProps<{
  slug: string;
}>();

const property = computed(() => findPropertyBySlug(props.slug));
</script>

<template>
  <main class="mx-auto w-full max-w-7xl flex-1 px-4 py-12">
    <section v-if="property">
      <router-link to="/properties" class="btn btn-ghost">
        &larr; Back to properties
      </router-link>

      <div class="grayscale mt-4">
        <img
          :src="property.heroImage"
          :alt="property.title"
          class="h-[28rem] w-full object-cover"
        />
      </div>

      <div class="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div>
          <p class="card-kicker">
            {{ property.type }} &middot; {{ property.status }}
          </p>
          <h1 class="mt-2 text-4xl md:text-5xl">{{ property.title }}</h1>
          <p class="text-muted mt-3 text-lg">{{ property.location }}</p>

          <hr class="hr" />

          <p class="max-w-prose leading-8">{{ property.description }}</p>
        </div>

        <aside class="card h-fit p-4">
          <p class="text-2xl font-semibold">
            {{ formatPropertyPrice(property) }}
          </p>

          <dl class="grid grid-cols-3 gap-3 border-t-2 border-divider pt-3">
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

          <div
            v-for="feature in property.features"
            :key="feature.label"
            class="flex justify-between gap-4 border-t border-divider pt-3 text-sm"
          >
            <span class="font-semibold">{{ feature.label }}</span>
            <span class="text-muted text-right">{{ feature.value }}</span>
          </div>

          <router-link
            :to="`/contact?property=${property.slug}`"
            class="btn btn-primary btn-block"
          >
            Request Private Showing
          </router-link>
        </aside>
      </div>
    </section>

    <section v-else class="max-w-2xl">
      <p class="card-kicker">404</p>
      <h1 class="mt-2 text-4xl md:text-5xl">Property not found</h1>

      <hr class="hr" />

      <p class="text-muted max-w-prose">
        The listing may have moved, sold, or never existed in this realm.
      </p>

      <router-link to="/properties" class="btn btn-primary mt-6">
        Return to Properties
      </router-link>
    </section>
  </main>
</template>
