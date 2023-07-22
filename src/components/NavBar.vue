<script setup lang="ts">
import {computed, } from "vue";
import {useRouter} from "vue-router";

const STOPS_URL_PATH = '/stops';
const router = useRouter();
const isStopsSelected = computed(() => router.currentRoute.value.path === STOPS_URL_PATH);

function selectLinesTab() {
  router.push('/');
}

function selectStopsTab() {
  router.push(STOPS_URL_PATH);
}
</script>

<template>
  <div class="tabs-header">
    <div class="tab" :class="{active: !isStopsSelected}" @click="selectLinesTab">
      Bus Lines
    </div>
    <div class="tab" :class="{active: isStopsSelected}" @click="selectStopsTab">
      Stops
    </div>
  </div>
</template>

<style scoped>
.tabs-header {
  height: 64px;
  display: flex;
  padding: 0 24px;
  align-items: center;
  align-self: stretch;
  border-radius: 4px;
  background: #FFF;
}

.tab {
  display: flex;
  padding: 20px 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  cursor: pointer;

  &.active {
    padding-bottom: 18px;
    border-bottom: 2px solid rgba(25, 82, 225, 1);
  }
}
</style>
