<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {useLocalCompany} from "~/store/company";

definePageMeta({
  layout: 'dashboard',
  middleware: ['is-log'],
})

const { getCompany, getAllCompany } = useCompany()

const companyId = useLocalCompany().getCompany()

const company = await getCompany(companyId)
const companyList = await getAllCompany();




</script>

<template>
<div>
  <div>
    <Select >
      <SelectTrigger>
        <SelectValue placeholder="Choisir une entreprise" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem :value="company.id" v-for="company in companyList">
            {{ company.name }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</div>
</template>

<style scoped>

</style>