<script setup lang='ts'>
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const props = defineProps({
  employee: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <Card class="w-[350px]" v-if="employee">
    <CardHeader>
      <CardTitle>{{ employee.firstname }} {{ employee.lastname }}</CardTitle>
      <CardDescription v-if="employee.position">Poste: {{ employee.position }}</CardDescription>
    </CardHeader>
    <CardContent>
      <p class="text-sm">Salaire: <span class="font-bold">{{ employee.salary }} €</span></p>
      <p class="text-sm">Email: <a class="font-bold" :href="`mailto:${employee.email}`">{{ employee.email }}</a></p>
      <p class="text-sm">Heures/mois: <span class="font-bold">{{ employee.hourPerMonth }} heures</span></p>
    </CardContent>
    <CardFooter>
      <Button class="w-full">Voir tout</Button>
    </CardFooter>
  </Card>
</template>