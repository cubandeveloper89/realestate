<template>
    <div class="flex flex-col items-center justify-center min-h-screen ">
      <div class="flex flex-col items-center p-8 border-1 border-[#5F7CE0] rounded-xl shadow-2xl">
        <h1 class="font-ancient text-4xl mb-8 cursor-default max-w-96">Asentar vuestro nombre en el Gran Libro</h1>
        <form @submit.prevent="handleRegister" class="flex flex-col gap-4 w-90">
          <input v-model="email" type="email" placeholder="Correo electrónico" class="p-2 border rounded" required />
          <input v-model="password" type="password" placeholder="Contraseña" class="p-2 border rounded" required />
          <button type="submit" class="bg-[#5F7CE0] dark:text-white p-2 rounded">Entrar</button>
          <h1>Ya estas inscrito?</h1>
          <router-link :to="'/login'">Inicia sesión aquí</router-link>
          <p v-if="error" class="text-red-500">{{ error }}</p>
        </form>

      </div>
  </div>
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

<style scoped>
</style>