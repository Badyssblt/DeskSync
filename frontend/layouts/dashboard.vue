<script setup lang="ts">
import {SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar";
</script>

<template>
<div>
  <Header/>
  <div class="flex justify-start">
    <SidebarProvider>
      <AppSidebar />
      <main class="flex-1">
        <slot/>
      </main>
    </SidebarProvider>

  </div>
</div>
</template>

<style scoped>

</style>