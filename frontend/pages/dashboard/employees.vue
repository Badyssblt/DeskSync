<script setup lang="ts">
import {useLocalCompany} from "~/store/company";
import {FormControl, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {Input} from "~/components/ui/input";


definePageMeta({
  layout: 'dashboard',
  middleware: ['is-log'],
})


const { getCompany } = useCompany()

const storeCompany = useLocalCompany()

const companyId = ref(storeCompany.companyId)

const company = ref(await getCompany(companyId.value))

watch(
    () => storeCompany.companyId,
    async (newCompanyId) => {
      if (newCompanyId) {
        company.value = await getCompany(newCompanyId);
      }
    }
);

</script>

<template>
<div>
  <div>
    <SelectCompany/>
    <div v-if="company" class="mt-4" :key="company.name">
      <h3 class="font-bold">Employés de {{ company.name }}</h3>

      <form>
        <FormField v-slot="{ componentField }" name="query">
          <FormItem>
            <FormLabel>Rechercher</FormLabel>
              <Input type="text" placeholder="johndoe@exemple.com" v-bind="componentField" />
          </FormItem>
        </FormField>
      </form>

      <div v-for="employee in company.employees" class="mt-4" v-if="company.employees.length > 0">
        <EmployeeCard :employee="employee" />
      </div>

      <div v-else class="mt-4">
        <p class="text-sm">Aucun employés...</p>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>