<script setup lang="ts">
import {computed, ref} from "vue";
import {IBusStop} from "@/interfaces/bus-stop.interface";
import store from "@/store";

const searchText = ref('');

const filteredStops = computed(() => {
  const suitableStopNames: string[] = searchText.value
      ? store.getters.getStops
          .map((stop: IBusStop) => stop.stop)
          .filter((stopName: string) => stopName.toUpperCase().startsWith(searchText.value.toUpperCase()))
      : store.getters.getStops
          .map((stop: IBusStop) => stop.stop);

  return Array.from(new Set(suitableStopNames)).sort((a: string, b: string) => b.localeCompare(a, 'pl'));
});
</script>

<template>
  <div class="content-wrapper">
    <div class="header-wrapper">
      <label class="position-relative d-block">
        <svg class="position-absolute h-100 text-muted search-icon" xmlns="http://www.w3.org/2000/svg" width="16"
             height="16"
             viewBox="0 0 16 16" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M1.83325 7.33337C1.83325 4.29581 4.29569 1.83337 7.33325 1.83337C10.3708 1.83337 12.8333 4.29581 12.8333 7.33337C12.8333 10.3709 10.3708 12.8334 7.33325 12.8334C4.29569 12.8334 1.83325 10.3709 1.83325 7.33337ZM7.33325 0.833374C3.7434 0.833374 0.833252 3.74352 0.833252 7.33337C0.833252 10.9232 3.7434 13.8334 7.33325 13.8334C8.9482 13.8334 10.4256 13.2444 11.5624 12.2696L13.6464 14.3536C13.8416 14.5489 14.1582 14.5489 14.3535 14.3536C14.5487 14.1583 14.5487 13.8418 14.3535 13.6465L12.2695 11.5625C13.2443 10.4257 13.8333 8.94832 13.8333 7.33337C13.8333 3.74352 10.9231 0.833374 7.33325 0.833374Z"
                fill="#9A9DA4"/>
        </svg>
        <input v-model="searchText" class="search-bar" placeholder="Search...">
      </label>
    </div>
    <div class="selection-container">
      <table class="table table-hover">
        <thead>
        <tr class="col-12">
          <th class="col-12"><span class="table-header no-selection">Bus Stops</span></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="stop in filteredStops" :key="stop" class="col-12">
          <td class="col-12 cursor-default">
            <span class="table-text">{{ stop }}</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

.table-text {
  color: #33373C;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
}

.table-header {
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.012px;
}

.selection-container {
  flex-grow: 1;
  width: 100%;
  min-height: 1px;
  display: flex;
}

.search-icon {
  right: 16px;
}

.search-bar {
  display: flex;
  width: 288px;
  padding: 12px 16px;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid #E2E4EA;
  background: #FFF;
}

.header-wrapper {
  display: flex;
  padding: 8px 24px 8px 8px;
  align-items: center;
  gap: 48px;
  align-self: stretch;
}

.content-wrapper {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  min-height: 1px;
  background-color: #FFF;
  border-radius: 4px;
}

table {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-bottom: 0 !important;
}

tbody {
  flex-grow: 1;
  overflow: auto;
}

thead {
  flex-grow: 0;
  display: flex;
}

tr {
  flex-grow: 0;
  display: flex;
}

th {
  flex-grow: 0;
  display: flex;
  padding: 24px;
}

td {
  padding: 20px 0 19px 24px;
  cursor: pointer;
}

.no-selection {
  user-select: none; /* standard syntax */
  -webkit-user-select: none; /* webkit (safari, chrome) browsers */
  -moz-user-select: none; /* mozilla browsers */
  -khtml-user-select: none; /* webkit (konqueror) browsers */
  -ms-user-select: none; /* IE10+ */
}

.cursor-default {
  cursor: default;
}
</style>
