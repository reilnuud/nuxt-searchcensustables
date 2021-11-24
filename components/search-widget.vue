<template>
  <div>
    <div class="flex flex-col my-6">
      <label class="uppercase font-bold text-xs mb-px">search</label>
      <input class="border-2 border-black py-1 px-2" v-model="q" />
    </div>
    <div>
      <ul
        v-if="results && results.length"
        :class="{ 'opacity-50 pointer-events-none animate-pulse': working }"
      >
        <li v-for="result in results" :key="result.id" class="mb-3">
          <div class="font-bold">{{ result.id }} - {{ result.label }}</div>
          <div class="text-sm">{{ result.concept }}</div>
        </li>
      </ul>
      <div v-else class="text-gray-500">No results for your query.</div>
    </div>
  </div>
</template>

<script>
import debounce from "lodash.debounce"

export default {
  data: () => ({
    results: [],
    searcher: null,
    working: false,
    q: "",
  }),
  mounted() {
    this.searcher = new Worker("/workers/search.worker.js", {
      type: "module",
    });
    this.searcher.onmessage = (event) => {
      if (event.data.key === "working") {
        this.working = event.data.value;
      } else {
        this.results = event.data.value;
      }
    };
  },
  watch: {
    q: debounce(function (value) {
      this.searcher.postMessage({ method: "search", query: value });
    }, 300),
  },
};
</script>
