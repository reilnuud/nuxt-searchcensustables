<template>
  <div class="p-6 font-sans flex flex-col max-w-2xl mx-auto">
    <h1 class="text-3xl">Census Search</h1>
    <p class="text-gray-500">Search available fields.</p>
    <client-only>
      <search-widget />
    </client-only>
  </div>
</template>

<script>
import "./css/index.css"
export default {
  components: { searchWidget: () => import('~/components/search-widget.vue') },
}
</script>