<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-vue-next'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast/use-toast'

import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { h } from 'vue'
import * as z from 'zod'
import {useAuth} from "~/store/auth";

const formSchema = toTypedSchema(z.object({
  email: z.string().email("L'email doit être valide").min(5, "L'email est trop court"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
}))

const loading = ref(false);

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
})

const { $api } = useNuxtApp()

const store = useAuth()

const onSubmit = handleSubmit(async (values) => {
  loading.value = true
  try {
    const response = await $api.post('/login', {
      email: values.email,
      password: values.password,
    })
    useCookie("token").value = response.data.token;
    store.token = response.data.token;
    useCookie('token', response.data.token);
    store.authenticate({
      email: values.email
    })
    navigateTo('/')
  }catch (e) {
    console.log(e)
  }
  loading.value = false
})
</script>

<template>
  <form class="w-full md:w-[500px] space-y-6 m-auto mt-6 px-[5%] md:px-6 border border-black/20 rounded py-8 dark:border-white/20 " @submit="onSubmit">
    <div>
      <h2 class="font-bold text-2xl text-center">Bon retour !</h2>
      <div class="flex justify-center gap-2">
        Pas encore de compte ?
        <NuxtLink to="/signup" class="text-main font-bold">S'inscrire</NuxtLink>
      </div>
    </div>
    <FormField v-slot="{ componentField }" name="email" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="text" placeholder="johndoe@exemple.com" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="password" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel>Mot de passe</FormLabel>
        <FormControl>
          <Input type="password" placeholder="*******" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit" class="w-full" :disabled="loading">
      <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="loading"/>
      Se connecter
    </Button>
  </form>
</template>
