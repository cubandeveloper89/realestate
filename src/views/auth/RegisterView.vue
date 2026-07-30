<template>
  <main class="flex flex-1 items-center px-4 py-12">
    <!-- The card is centred as layout; everything inside stays flush left. -->
    <div class="mx-auto w-full max-w-sm">
      <p class="card-kicker">Realm Properties</p>
      <h1 class="mt-2 text-3xl">Enter your name in the Great Book</h1>

      <hr class="hr" />

      <form @submit.prevent="handleRegister" class="flex flex-col gap-4">
        <div class="field">
          <label for="register-email">Email address</label>
          <input
            id="register-email"
            v-model="email"
            type="email"
            class="input"
            placeholder="you@email.com"
            required
          />
        </div>

        <div class="field">
          <label for="register-password">Password</label>
          <input
            id="register-password"
            v-model="password"
            type="password"
            class="input"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary btn-block">Create Account</button>

        <p v-if="error" class="m-0 text-sm text-accent-700">{{ error }}</p>
      </form>

      <p class="text-muted mt-6 mb-0 text-sm">
        Already registered?
        <router-link to="/login">Sign in here</router-link>
      </p>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const handleRegister = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    // Usuario registrado exitosamente
    const user = userCredential.user;
    console.log("Usuario creado:", user);
    router.push('/home'); // Redirige al hogar del reino (Home)
  } catch (err: any) {
    error.value = err.message;
  }
};
</script>
