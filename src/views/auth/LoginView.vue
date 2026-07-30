<!-- src/views/LoginView.vue -->
<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <div class="flex flex-col items-center p-8 border-1 border-[#5F7CE0] rounded-xl shadow-2xl">
      <h1 class="font-ancient text-4xl mb-8 cursor-default">Accede al Reino</h1>
      <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
        <input v-model="email" type="email" placeholder="Correo electrónico" class="p-2 border rounded" required />
        <input v-model="password" type="password" placeholder="Contraseña" class="p-2 border rounded" required />
        <button type="submit" class="bg-[#5F7CE0] dark:text-white p-2 rounded">Entrar</button>
        <div class="flex justify-center space-x-2">
              <button @click="googleSignIn"><img src="../../assets/img/google.png" alt="google" width="40" class="hover:cursor-pointer"></button>
              <button><img src="../../assets/img/facebook.png" alt="facebook" width="40" class="hover:cursor-pointer"></button>
              <button @click="xSignIn"><img src="../../assets/img/twitter.png" alt="twitter" width="40" class="hover:cursor-pointer"></button>
              <button @click="githubSignIn"><img src="../../assets/img/github.png" alt="github" width="40" class="hover:cursor-pointer"></button>
          </div>
        <h1>Eres nuevo?</h1>
        <router-link :to="'/register'">Regístrate aquí</router-link>
        <p v-if="error" class="text-red-500">{{ error }}</p>
      </form>

    </div>
  </div>
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