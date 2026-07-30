# Public Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first usable public foundation for Realm Properties: clean browser routing, public layout boundaries, typed local property data, property listing, and property detail pages.

**Architecture:** Keep one Vue application. Public pages use the existing header/footer for now, while property data lives in typed local modules that can later be replaced by Firebase-backed repositories. Admin remains a planned `/admin` section but is not implemented in this phase.

**Tech Stack:** Vue 3, Vite, TypeScript, Vue Router, Tailwind CSS, Firebase Auth already present.

**Verification Note:** This project does not currently include a test runner. For this phase, use `npm run build` plus manual route verification. Add automated tests in a later task when introducing route guards, stores, composables, or data mappers with meaningful behavior.

---

## File Structure

- Modify `src/router/index.ts`: switch to browser history, add named routes, add property detail route, and keep auth/public routes explicit.
- Modify `src/App.vue`: keep the top-level app simple and remove unused scaffold CSS.
- Create `src/types/property.ts`: shared property type definitions.
- Create `src/data/properties.ts`: typed local property fixtures and lookup helpers.
- Modify `src/views/HomeView.vue`: replace placeholder copy/image with a public boutique home page using real estate signals.
- Modify `src/views/PropertiesView.vue`: replace empty view with a property catalog backed by local data.
- Create `src/views/PropertyDetailView.vue`: show one property by slug and handle missing slugs.
- Modify `src/components/HeaderComponent.vue`: align nav targets and active state with browser routing.
- Modify `src/components/Footer.vue`: align footer links and copy with the public site direction.

## Task 1: Router Foundation

**Files:**
- Modify: `src/router/index.ts`
- Modify: `src/App.vue`
- Create: `src/views/PropertyDetailView.vue`

- [ ] **Step 1: Update router to browser history and named routes**

Replace `src/router/index.ts` with:

```ts
import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/auth/LoginView.vue";
import RegisterView from "../views/auth/RegisterView.vue";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ContactView from "../views/ContactView.vue";
import PropertiesView from "../views/PropertiesView.vue";
import PropertyDetailView from "../views/PropertyDetailView.vue";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", name: "home", component: HomeView },
  { path: "/about", name: "about", component: AboutView },
  { path: "/properties", name: "properties", component: PropertiesView },
  {
    path: "/properties/:slug",
    name: "property-detail",
    component: PropertyDetailView,
    props: true,
  },
  { path: "/contact", name: "contact", component: ContactView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/register", name: "register", component: RegisterView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

- [ ] **Step 2: Simplify app shell**

Replace `src/App.vue` with:

```vue
<script setup lang="ts">
import Footer from "./components/Footer.vue";
import HeaderComponent from "./components/HeaderComponent.vue";
</script>

<template>
  <HeaderComponent />
  <router-view />
  <Footer />
</template>
```

- [ ] **Step 3: Create temporary property detail view**

Create `src/views/PropertyDetailView.vue`:

```vue
<template>
  <main class="min-h-screen bg-[#f7f3ea] px-6 py-12 text-[#1f2933]">
    <section class="mx-auto max-w-4xl rounded-lg bg-white p-8 text-left shadow-lg">
      <router-link to="/properties" class="text-sm font-semibold text-[#5F7CE0]">
        Back to properties
      </router-link>
      <h1 class="mt-6 font-ancient text-5xl text-[#172033]">Property details</h1>
      <p class="mt-3 text-[#596675]">
        Detailed listing content will be connected after property data is introduced.
      </p>
    </section>
  </main>
</template>
```

- [ ] **Step 4: Run type/build verification**

Run: `npm run build`

Expected: PASS. If it fails, stop and debug before continuing.

- [ ] **Step 5: Commit router foundation**

```bash
git add src/router/index.ts src/App.vue src/views/PropertyDetailView.vue
git commit -m "feat: set up public router foundation"
```

## Task 2: Typed Property Fixtures

**Files:**
- Create: `src/types/property.ts`
- Create: `src/data/properties.ts`

- [ ] **Step 1: Create property types**

Create `src/types/property.ts`:

```ts
export type PropertyStatus = "available" | "reserved" | "sold";

export interface PropertyFeature {
  label: string;
  value: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: number;
  currency: "USD";
  status: PropertyStatus;
  type: "Estate" | "Villa" | "Townhouse" | "Penthouse";
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  heroImage: string;
  summary: string;
  description: string;
  features: PropertyFeature[];
}
```

- [ ] **Step 2: Create local property fixtures and helpers**

Create `src/data/properties.ts`:

```ts
import type { Property } from "../types/property";

export const properties: Property[] = [
  {
    id: "rp-001",
    slug: "silverkeep-estate",
    title: "Silverkeep Estate",
    location: "Asheville, North Carolina",
    price: 1280000,
    currency: "USD",
    status: "available",
    type: "Estate",
    bedrooms: 5,
    bathrooms: 4,
    areaSqFt: 5200,
    heroImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    summary: "A secluded estate with mountain views, guest quarters, and formal gardens.",
    description:
      "Silverkeep Estate blends old-world character with practical modern comfort. The home offers generous entertaining spaces, quiet private suites, and outdoor areas designed for long stays and private gatherings.",
    features: [
      { label: "Lot", value: "3.8 acres" },
      { label: "Garage", value: "3 cars" },
      { label: "Highlight", value: "Mountain terrace" },
    ],
  },
  {
    id: "rp-002",
    slug: "ravenstone-villa",
    title: "Ravenstone Villa",
    location: "Charleston, South Carolina",
    price: 895000,
    currency: "USD",
    status: "reserved",
    type: "Villa",
    bedrooms: 4,
    bathrooms: 3,
    areaSqFt: 3400,
    heroImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
    summary: "A refined villa with courtyard living, warm interiors, and a walkable district.",
    description:
      "Ravenstone Villa is designed around a private courtyard that brings light into the main living areas. It suits buyers who want a polished home near restaurants, galleries, and historic streets.",
    features: [
      { label: "Outdoor", value: "Private courtyard" },
      { label: "Kitchen", value: "Chef-ready layout" },
      { label: "District", value: "Historic quarter" },
    ],
  },
  {
    id: "rp-003",
    slug: "goldenhall-penthouse",
    title: "Goldenhall Penthouse",
    location: "Miami, Florida",
    price: 1760000,
    currency: "USD",
    status: "available",
    type: "Penthouse",
    bedrooms: 3,
    bathrooms: 3,
    areaSqFt: 2850,
    heroImage:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80",
    summary: "A bright penthouse with skyline views, private elevator access, and terrace dining.",
    description:
      "Goldenhall Penthouse puts the city at eye level. Floor-to-ceiling glass, a deep terrace, and direct elevator entry create a polished home for buyers who want privacy without leaving the center of the action.",
    features: [
      { label: "View", value: "Skyline and bay" },
      { label: "Access", value: "Private elevator" },
      { label: "Terrace", value: "Outdoor dining" },
    ],
  },
];

export function findPropertyBySlug(slug: string): Property | undefined {
  return properties.find((property) => property.slug === slug);
}

export function formatPropertyPrice(property: Property): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: property.currency,
    maximumFractionDigits: 0,
  }).format(property.price);
}
```

- [ ] **Step 3: Run type/build verification**

Run: `npm run build`

Expected: PASS. If it fails, stop and debug before continuing.

- [ ] **Step 4: Commit typed fixtures**

```bash
git add src/types/property.ts src/data/properties.ts
git commit -m "feat: add typed property fixtures"
```

## Task 3: Public Home Page

**Files:**
- Modify: `src/views/HomeView.vue`

- [ ] **Step 1: Replace placeholder home page**

Replace `src/views/HomeView.vue` with:

```vue
<script setup lang="ts">
import { computed } from "vue";
import { properties, formatPropertyPrice } from "../data/properties";

const featuredProperty = computed(() => properties[0]);
</script>

<template>
  <main class="min-h-screen bg-[#f7f3ea] text-[#1f2933]">
    <section class="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.05fr_0.95fr] md:items-center lg:px-8">
      <div class="text-left">
        <p class="font-typewriter text-sm uppercase tracking-[0.18em] text-[#5F7CE0]">
          Boutique real estate
        </p>
        <h1 class="mt-4 font-ancient text-6xl leading-none text-[#172033] md:text-7xl">
          Realm Properties
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-[#44515f]">
          Curated homes with character, clear details, and a calmer path from first look to private showing.
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <router-link
            to="/properties"
            class="rounded bg-[#5F7CE0] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4b63bd]"
          >
            View Properties
          </router-link>
          <router-link
            to="/contact"
            class="rounded border border-[#5F7CE0] px-5 py-3 text-sm font-semibold text-[#24304f] transition hover:bg-white"
          >
            Request a Showing
          </router-link>
        </div>
      </div>

      <article class="overflow-hidden rounded-lg bg-white shadow-xl">
        <img
          :src="featuredProperty.heroImage"
          :alt="featuredProperty.title"
          class="h-80 w-full object-cover"
        />
        <div class="p-6 text-left">
          <p class="text-sm uppercase tracking-[0.16em] text-[#5F7CE0]">
            Featured listing
          </p>
          <h2 class="mt-2 font-morris text-3xl text-[#172033]">
            {{ featuredProperty.title }}
          </h2>
          <p class="mt-2 text-[#596675]">{{ featuredProperty.location }}</p>
          <p class="mt-4 text-2xl font-semibold text-[#172033]">
            {{ formatPropertyPrice(featuredProperty) }}
          </p>
          <router-link
            :to="`/properties/${featuredProperty.slug}`"
            class="mt-5 inline-flex rounded bg-[#172033] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2d3b52]"
          >
            Inspect Property
          </router-link>
        </div>
      </article>
    </section>
  </main>
</template>
```

- [ ] **Step 2: Run type/build verification**

Run: `npm run build`

Expected: PASS. If it fails, stop and debug before continuing.

- [ ] **Step 3: Commit home page**

```bash
git add src/views/HomeView.vue
git commit -m "feat: build public home page"
```

## Task 4: Property Catalog

**Files:**
- Modify: `src/views/PropertiesView.vue`

- [ ] **Step 1: Replace empty properties view**

Replace `src/views/PropertiesView.vue` with:

```vue
<script setup lang="ts">
import { properties, formatPropertyPrice } from "../data/properties";
</script>

<template>
  <main class="min-h-screen bg-[#f7f3ea] px-6 py-12 text-[#1f2933] lg:px-8">
    <section class="mx-auto max-w-7xl">
      <div class="max-w-3xl text-left">
        <p class="font-typewriter text-sm uppercase tracking-[0.18em] text-[#5F7CE0]">
          Curated portfolio
        </p>
        <h1 class="mt-3 font-ancient text-6xl leading-none text-[#172033]">
          Properties
        </h1>
        <p class="mt-4 text-lg leading-8 text-[#596675]">
          A focused collection of homes chosen for location, character, and long-term value.
        </p>
      </div>

      <div class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="property in properties"
          :key="property.id"
          class="overflow-hidden rounded-lg bg-white text-left shadow-lg"
        >
          <img
            :src="property.heroImage"
            :alt="property.title"
            class="h-56 w-full object-cover"
          />
          <div class="p-5">
            <div class="flex items-center justify-between gap-3">
              <span class="rounded bg-[#e8ecff] px-3 py-1 text-xs font-semibold uppercase text-[#4b63bd]">
                {{ property.status }}
              </span>
              <span class="text-sm text-[#596675]">{{ property.type }}</span>
            </div>
            <h2 class="mt-4 font-morris text-2xl text-[#172033]">
              {{ property.title }}
            </h2>
            <p class="mt-1 text-sm text-[#596675]">{{ property.location }}</p>
            <p class="mt-4 text-xl font-semibold text-[#172033]">
              {{ formatPropertyPrice(property) }}
            </p>
            <dl class="mt-4 grid grid-cols-3 gap-3 text-sm text-[#44515f]">
              <div>
                <dt class="font-semibold">Beds</dt>
                <dd>{{ property.bedrooms }}</dd>
              </div>
              <div>
                <dt class="font-semibold">Baths</dt>
                <dd>{{ property.bathrooms }}</dd>
              </div>
              <div>
                <dt class="font-semibold">Sq ft</dt>
                <dd>{{ property.areaSqFt.toLocaleString() }}</dd>
              </div>
            </dl>
            <p class="mt-4 text-sm leading-6 text-[#596675]">
              {{ property.summary }}
            </p>
            <router-link
              :to="`/properties/${property.slug}`"
              class="mt-5 inline-flex rounded bg-[#172033] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2d3b52]"
            >
              View Details
            </router-link>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>
```

- [ ] **Step 2: Run type/build verification**

Run: `npm run build`

Expected: PASS. If it fails, stop and debug before continuing.

- [ ] **Step 3: Commit property catalog**

```bash
git add src/views/PropertiesView.vue
git commit -m "feat: build property catalog"
```

## Task 5: Property Detail Page

**Files:**
- Modify: `src/views/PropertyDetailView.vue`

- [ ] **Step 1: Create property detail view**

Replace `src/views/PropertyDetailView.vue` with:

```vue
<script setup lang="ts">
import { computed } from "vue";
import { findPropertyBySlug, formatPropertyPrice } from "../data/properties";

const props = defineProps<{
  slug: string;
}>();

const property = computed(() => findPropertyBySlug(props.slug));
</script>

<template>
  <main class="min-h-screen bg-[#f7f3ea] px-6 py-12 text-[#1f2933] lg:px-8">
    <section v-if="property" class="mx-auto max-w-6xl">
      <router-link to="/properties" class="text-sm font-semibold text-[#5F7CE0] hover:text-[#4b63bd]">
        Back to properties
      </router-link>

      <div class="mt-6 overflow-hidden rounded-lg bg-white shadow-xl">
        <img
          :src="property.heroImage"
          :alt="property.title"
          class="h-[28rem] w-full object-cover"
        />
        <div class="grid gap-8 p-6 text-left lg:grid-cols-[1fr_20rem] lg:p-8">
          <div>
            <p class="text-sm uppercase tracking-[0.16em] text-[#5F7CE0]">
              {{ property.type }} · {{ property.status }}
            </p>
            <h1 class="mt-3 font-ancient text-6xl leading-none text-[#172033]">
              {{ property.title }}
            </h1>
            <p class="mt-3 text-lg text-[#596675]">{{ property.location }}</p>
            <p class="mt-6 text-base leading-8 text-[#44515f]">
              {{ property.description }}
            </p>
          </div>

          <aside class="rounded bg-[#f7f3ea] p-5">
            <p class="text-2xl font-semibold text-[#172033]">
              {{ formatPropertyPrice(property) }}
            </p>
            <dl class="mt-5 grid grid-cols-3 gap-3 text-sm text-[#44515f]">
              <div>
                <dt class="font-semibold">Beds</dt>
                <dd>{{ property.bedrooms }}</dd>
              </div>
              <div>
                <dt class="font-semibold">Baths</dt>
                <dd>{{ property.bathrooms }}</dd>
              </div>
              <div>
                <dt class="font-semibold">Sq ft</dt>
                <dd>{{ property.areaSqFt.toLocaleString() }}</dd>
              </div>
            </dl>
            <div class="mt-6 space-y-3">
              <div
                v-for="feature in property.features"
                :key="feature.label"
                class="flex justify-between gap-4 border-t border-[#d9d2c3] pt-3 text-sm"
              >
                <span class="font-semibold text-[#172033]">{{ feature.label }}</span>
                <span class="text-right text-[#596675]">{{ feature.value }}</span>
              </div>
            </div>
            <router-link
              to="/contact"
              class="mt-6 inline-flex w-full justify-center rounded bg-[#5F7CE0] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4b63bd]"
            >
              Request Private Showing
            </router-link>
          </aside>
        </div>
      </div>
    </section>

    <section v-else class="mx-auto max-w-3xl rounded-lg bg-white p-8 text-center shadow-lg">
      <h1 class="font-ancient text-5xl text-[#172033]">Property not found</h1>
      <p class="mt-3 text-[#596675]">
        The listing may have moved, sold, or never existed in this realm.
      </p>
      <router-link
        to="/properties"
        class="mt-6 inline-flex rounded bg-[#172033] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2d3b52]"
      >
        Return to Properties
      </router-link>
    </section>
  </main>
</template>
```

- [ ] **Step 2: Run type/build verification**

Run: `npm run build`

Expected: PASS. If it fails, fix only the reported issue before continuing.

- [ ] **Step 3: Commit property detail page**

```bash
git add src/views/PropertyDetailView.vue
git commit -m "feat: add property detail page"
```

## Task 6: Navigation And Footer Alignment

**Files:**
- Modify: `src/components/HeaderComponent.vue`
- Modify: `src/components/Footer.vue`

- [ ] **Step 1: Update header route behavior**

In `src/components/HeaderComponent.vue`, make the logo route point to `/home`, keep menu items as public routes, and make active state include child property pages:

```ts
const isActiveRoute = (href: string): boolean => {
  if (href === "/properties") {
    return route.path.startsWith("/properties");
  }

  return route.path === href;
};
```

Also change the logo link:

```vue
<router-link to="/home" class="flex items-center space-x-2 group">
```

- [ ] **Step 2: Update footer route targets**

In `src/components/Footer.vue`, change the first footer link from `to="/"` to `to="/home"` and add a properties link near the other quick links:

```vue
<router-link
  to="/properties"
  class="hover:text-[#5F7CE0] transition-colors duration-300"
>
  Propiedades
</router-link>
```

- [ ] **Step 3: Run full build**

Run: `npm run build`

Expected: PASS with no TypeScript or Vite errors.

- [ ] **Step 4: Commit navigation alignment**

```bash
git add src/components/HeaderComponent.vue src/components/Footer.vue
git commit -m "feat: align public navigation"
```

## Task 7: Manual Verification

**Files:**
- No source changes expected unless verification finds a defect.

- [ ] **Step 1: Start local server**

Run: `npm run dev`

Expected: Vite prints a local URL.

- [ ] **Step 2: Verify public routes**

Open the local URL and verify:

- `/home` shows the public boutique home page.
- `/properties` shows three property cards.
- `/properties/silverkeep-estate` shows a detail page.
- `/properties/not-real` shows the not-found state.
- Header active state highlights Properties on property detail pages.
- Footer links navigate to valid public routes.

- [ ] **Step 3: Stop local server**

Stop the dev server with `Ctrl+C`.

- [ ] **Step 4: Final status check**

Run:

```bash
git status --short
```

Expected: clean worktree.

## Self-Review

- Spec coverage: this plan covers routing cleanup, public home, properties list, property details, local typed data, and navigation alignment. It intentionally does not implement `/admin`; that remains a later phase after public structure exists.
- Placeholder scan: no TBD/TODO placeholders remain. The temporary detail page in Task 1 is intentionally replaced by Task 5 before final verification.
- Type consistency: `Property`, `PropertyFeature`, `findPropertyBySlug`, and `formatPropertyPrice` are defined before use and referenced consistently.
