<!-- src/views/auth/LoginView.vue -->
<template>
  <main class="flex flex-1 items-center px-4 py-12">
    <!-- The card is centred as layout; everything inside stays flush left. -->
    <div class="mx-auto w-full max-w-sm">
      <p class="card-kicker">Realm Properties</p>
      <h1 class="mt-2 text-3xl">Enter the Realm</h1>

      <hr class="hr" />

      <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
        <div class="field">
          <label for="login-email">Email address</label>
          <input
            id="login-email"
            v-model="email"
            type="email"
            class="input"
            placeholder="you@email.com"
            required
          />
        </div>

        <div class="field">
          <label for="login-password">Password</label>
          <input
            id="login-password"
            v-model="password"
            type="password"
            class="input"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary btn-block">Sign In</button>

        <p v-if="error" class="m-0 text-sm text-accent-700">{{ error }}</p>
      </form>

      <hr class="hr" />

      <h6>Or continue with</h6>
      <div class="mt-3 flex gap-2">
        <button type="button" class="btn btn-secondary btn-icon" @click="googleSignIn" aria-label="Google">
          <img src="../../assets/img/google.png" alt="" width="20" />
        </button>
        <button type="button" class="btn btn-secondary btn-icon" aria-label="Facebook">
          <img src="../../assets/img/facebook.png" alt="" width="20" />
        </button>
        <button type="button" class="btn btn-secondary btn-icon" @click="xSignIn" aria-label="X">
          <img src="../../assets/img/twitter.png" alt="" width="20" />
        </button>
        <button type="button" class="btn btn-secondary btn-icon" @click="githubSignIn" aria-label="GitHub">
          <img src="../../assets/img/github.png" alt="" width="20" />
        </button>
      </div>

      <p class="text-muted mt-6 mb-0 text-sm">
        New here?
        <router-link to="/register">Create an account</router-link>
      </p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, TwitterAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { useRouter } from 'vue-router';

const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();
const githubProvider = new GithubAuthProvider();

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push('/home'); // Redirige al hogar del reino (Home)
  } catch (err: any) {
    error.value = err.message; // Maneja errores como "credenciales inválidas"
  }
}

const googleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credentials = GoogleAuthProvider.credentialFromResult(result);
    const token = credentials?.accessToken;
    console.log('token de credenciales', token);

    // router.push('/home');
  } catch (err: any) {
    error.value = err.message;
  }
};

const xSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, twitterProvider);
    const credentials = TwitterAuthProvider.credentialFromResult(result);
    const token = credentials?.accessToken;
    console.log('token de credenciales', token);
  } catch (err: any) {
    error.value = err.message;
  }
}

const githubSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const credentials = GithubAuthProvider.credentialFromResult(result);
    const token = credentials?.accessToken;
    // Implementa la lógica de inicio de sesión con GitHub aquí
    console.log('GitHub sign-in listo, token de credenciales', token);
  } catch (err: any) {
    error.value = err.message;
  }
}
</script>
