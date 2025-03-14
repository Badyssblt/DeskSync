<script setup lang='ts'>
import { Button } from '@/components/ui/button'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";
import {CirclePlus} from "lucide-vue-next";

definePageMeta({
  layout: "dashboard"
})

const businessSectors = ref([
  'Technologie',
  'Finance',
  'Santé',
  'Éducation',
  'Construction',
  'Immobilier',
  'Énergie',
  'Transport',
  'Commerce de détail',
  'Alimentation et boissons',
  'Mode et textile',
  'Automobile',
  'Aéronautique',
  'Divertissement',
  'Tourisme et hôtellerie',
  'Agriculture',
  'Télécommunications',
  'Marketing et publicité',
  'Juridique',
  'Consulting',
  'Assurance',
  'Sport et bien-être',
  'Écologie et développement durable',
  'Logistique et supply chain',
  'Sciences et recherche',
  'Jeux vidéo',
  'Pharmaceutique',
  'Cybersecurité',
  'Blockchain et cryptomonnaies',
  'Ressources humaines',
]);

const formType = ref([
    'SARL',
    'SAS',
    'EURL',
    'Auto-entreprise'
])


const formSchema = toTypedSchema(z.object({
  name: z.string().min(2, 'Le nom est trop court !').max(50, 'Le nom est trop long !'),
  email: z.string().email("L'email doit être valide"),
  siret: z.number().int("Veuillez rentrer un siret valide !"),
  address: z.any(),
  phone: z.any(),
  website: z.any(),
  sector: z.any(),
  form: z.any()
}))

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema
})

const { $api } = useNuxtApp();

const onSubmit = handleSubmit(async (values) => {
  console.log(values)
  try {
    const response = await $api.post(`/api/company`, {
      name: values.name,
      email: values.email,
      siret: values.siret,
      address: values.address,
      website: values.website,
      status: values.status,
    })
  }catch(error) {

  }
})

</script>

<template>
  <Card class="w-1/2 md:m-auto  mt-6">
    <CardHeader>
      <CardTitle>Créer votre entreprise</CardTitle>
      <CardDescription>Créer votre entreprise en renseignant vos informations.</CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="onSubmit">
        <div class="grid items-center w-full gap-4">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel for="name">Nom</FormLabel>
              <FormControl>
                <Input id="name" placeholder="Nom de votre entreprise" v-bind="componentField"/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel for="email">Email</FormLabel>
              <FormControl>
                <Input type="email" id="email" placeholder="Email de votre entreprise" v-bind="componentField"/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="siret">
            <FormItem>
              <FormLabel for="siret">Siret</FormLabel>
              <FormControl>
                <Input type="number" id="siret" placeholder="Siret de votre entreprise" v-bind="componentField"/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="address">
            <FormItem>
              <FormLabel for="address">Adresse</FormLabel>
              <FormControl>
                <Input type="text" id="address" placeholder="Adresse de votre entreprise" v-bind="componentField"/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="phone">
            <FormItem>
              <FormLabel for="phone">Téléphone</FormLabel>
              <FormControl>
                <Input type="text" id="phone" placeholder="Numéro de téléphone de votre entreprise" v-bind="componentField"/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="website">
            <FormItem>
              <FormLabel for="website">Site internet</FormLabel>
              <FormControl>
                <Input type="text" id="website" placeholder="URL  du site de votre entreprise" v-bind="componentField"/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="sector">
            <FormItem>
            <FormLabel for="sector">Secteur</FormLabel>
            <Select v-bind="componentField">
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un secteur" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem :value="sector" v-for="sector in businessSectors">
                    {{ sector }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
              <FormMessage/>
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="form">
            <FormItem>
              <FormLabel for="form">Forme de l'entreprise</FormLabel>
              <Select v-bind="componentField">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une forme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem :value="form" v-for="form in formType">
                      {{ form }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage/>
            </FormItem>
          </FormField>


          <div>

          </div>
        </div>
        <Button type="submit" class="w-full">Créer mon entreprise</Button>
      </form>
    </CardContent>
    <CardFooter>
    </CardFooter>
  </Card>
</template>