<script setup lang="ts">
import { SunIcon, MoonIcon } from "@heroicons/vue/24/solid";
import {useAuth} from "~/store/auth";

const colorMode = useColorMode()

const store = useAuth();
const isAuth = store.isAuthenticated;
</script>

<template>
<header class="flex justify-between px-[5%] py-6 border-b border-black/20 border-dashed dark:border-white/20">
  <h1 class="font-bold text-xl">deskSync</h1>
  <div>

  </div>

  <div class="flex items-center gap-4">
    <Button v-if="!isAuth">S'inscrire</Button>
    <Button v-else>Mon compte</Button>
    <Button @click="colorMode.preference = 'dark'" v-if="$colorMode.preference === 'light'"><SunIcon/></Button>
    <Button @click="colorMode.preference = 'light'" v-else-if="$colorMode.preference === 'dark'"><MoonIcon/></Button>
    <Button @click="colorMode.preference = 'light'" v-else><MoonIcon/></Button>
  </div>
</header>
</template>

<style scoped>

</style>