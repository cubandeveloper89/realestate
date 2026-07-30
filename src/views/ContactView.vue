<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { properties, findPropertyBySlug } from "../data/properties";
import {
  createEmptyInquiry,
  inquiryTopics,
  submitInquiry,
  validateInquiry,
  type InquiryErrors,
} from "../data/inquiries";
import type { ContactInquiry } from "../types/inquiry";

const route = useRoute();

const form = reactive(createEmptyInquiry());
const errors = ref<InquiryErrors>({});
const isSubmitting = ref(false);
const submitted = ref<ContactInquiry | null>(null);

// A property detail page links here as /contact?property=<slug>.
onMounted(() => {
  const slug = route.query.property;
  if (typeof slug === "string" && findPropertyBySlug(slug)) {
    form.propertySlug = slug;
  }
});

const handleSubmit = async () => {
  errors.value = validateInquiry(form);
  if (Object.keys(errors.value).length > 0) return;

  isSubmitting.value = true;
  try {
    submitted.value = await submitInquiry(form);
  } finally {
    isSubmitting.value = false;
  }
};

const startAnother = () => {
  Object.assign(form, createEmptyInquiry());
  errors.value = {};
  submitted.value = null;
};
</script>

<template>
  <main class="mx-auto w-full max-w-7xl flex-1 px-4 py-12">
    <div class="max-w-3xl">
      <p class="card-kicker">Contact</p>
      <h1 class="mt-2 text-4xl md:text-5xl">Let's talk</h1>
      <p class="text-muted mt-4 max-w-prose">
        Book a viewing, ask for a valuation, or tell us what you are looking
        for. We reply within one working day.
      </p>
    </div>

    <hr class="hr" />

    <div class="grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-start">
      <!-- Confirmation replaces the form once an enquiry is accepted. -->
      <section v-if="submitted" class="card p-6">
        <p class="card-kicker">Enquiry received</p>
        <h2 class="card-title text-2xl">Thank you, {{ submitted.name }}.</h2>
        <p class="card-body text-base">
          We have your message and will reply to
          <strong>{{ submitted.email }}</strong> within one working day.
        </p>
        <button type="button" class="btn btn-secondary mt-2 self-start" @click="startAnother">
          Send another enquiry
        </button>
      </section>

      <form v-else class="flex flex-col gap-5" novalidate @submit.prevent="handleSubmit">
        <div class="grid gap-5 md:grid-cols-2">
          <div class="field">
            <label for="contact-name">Name</label>
            <input
              id="contact-name"
              v-model="form.name"
              type="text"
              class="input"
              autocomplete="name"
              :aria-invalid="Boolean(errors.name)"
            />
            <p v-if="errors.name" class="mt-1 mb-0 text-xs text-accent-700">
              {{ errors.name }}
            </p>
          </div>

          <div class="field">
            <label for="contact-email">Email address</label>
            <input
              id="contact-email"
              v-model="form.email"
              type="email"
              class="input"
              autocomplete="email"
              placeholder="you@email.com"
              :aria-invalid="Boolean(errors.email)"
            />
            <p v-if="errors.email" class="mt-1 mb-0 text-xs text-accent-700">
              {{ errors.email }}
            </p>
          </div>
        </div>

        <div class="field">
          <label for="contact-phone">Phone <span class="text-muted">(optional)</span></label>
          <input
            id="contact-phone"
            v-model="form.phone"
            type="tel"
            class="input"
            autocomplete="tel"
          />
        </div>

        <fieldset class="field">
          <legend>What is this about?</legend>
          <div class="seg">
            <label
              v-for="topic in inquiryTopics"
              :key="topic.value"
              class="seg-opt"
            >
              <input type="radio" name="topic" v-model="form.topic" :value="topic.value" />
              {{ topic.label }}
            </label>
          </div>
        </fieldset>

        <div class="field">
          <label for="contact-property">Property <span class="text-muted">(optional)</span></label>
          <select id="contact-property" v-model="form.propertySlug" class="input">
            <option value="">No specific property</option>
            <option
              v-for="property in properties"
              :key="property.id"
              :value="property.slug"
            >
              {{ property.title }} — {{ property.location }}
            </option>
          </select>
        </div>

        <div class="field">
          <label for="contact-message">Message</label>
          <textarea
            id="contact-message"
            v-model="form.message"
            class="input"
            rows="6"
            :aria-invalid="Boolean(errors.message)"
          ></textarea>
          <p v-if="errors.message" class="mt-1 mb-0 text-xs text-accent-700">
            {{ errors.message }}
          </p>
        </div>

        <button type="submit" class="btn btn-primary btn-block" :disabled="isSubmitting">
          {{ isSubmitting ? "Sending…" : "Send Enquiry" }}
        </button>
      </form>

      <aside class="card h-fit p-4">
        <h6>Direct</h6>
        <p class="card-body mt-2 text-sm">
          Prefer to talk? Reach the office directly.
        </p>

        <div class="border-t-2 border-divider pt-3 text-sm">
          <p class="text-muted m-0 text-[11px] uppercase tracking-[0.08em]">Email</p>
          <p class="m-0">info@realmproperties.com</p>
        </div>
        <div class="border-t border-divider pt-3 text-sm">
          <p class="text-muted m-0 text-[11px] uppercase tracking-[0.08em]">Phone</p>
          <p class="m-0">+1 (555) 123-4567</p>
        </div>
        <div class="border-t border-divider pt-3 text-sm">
          <p class="text-muted m-0 text-[11px] uppercase tracking-[0.08em]">Office</p>
          <p class="m-0">Kingdom City, Realm Properties</p>
        </div>
      </aside>
    </div>
  </main>
</template>
