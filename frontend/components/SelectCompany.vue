<script setup lang="ts">

import {FormField, FormItem, FormLabel} from "~/components/ui/form";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";
import {CirclePlus} from "lucide-vue-next";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {useForm} from "vee-validate";
import {useLocalCompany} from "~/store/company";

const { getCompany, getAllCompany } = useCompany()

const storeCompany = useLocalCompany()

const companyId = ref(storeCompany.companyId)

const companyList = await getAllCompany();

const formSchema = toTypedSchema(z.object({
  company: z
      .number()
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    company: companyId.value
  }
})

const onSubmit = handleSubmit((values) => {
  storeCompany.companyId = values.company;
})


</script>

<template>
  <form @change.prevent="onSubmit">
    <FormField v-slot="{ componentField }" name="company">
      <FormItem>
        <FormLabel>Sélectionner une entreprise</FormLabel>
        <Select v-bind="componentField">
          <SelectTrigger>
            <SelectValue placeholder="Choisir une entreprise" />
          </SelectTrigger>
          <SelectContent>
            <Button class="w-full" @click="navigateTo('/company/create')">
              <CirclePlus class="w-4 h-4 mr-2" />
              Créer une entreprise
            </Button>
            <SelectGroup>
              <SelectItem :value="company.id" v-for="company in companyList">
                {{ company.name }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </FormItem>
    </FormField>
  </form>
</template>

<style scoped>

</style>