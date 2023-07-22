<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import {onMounted} from "vue";
import {getBusStops} from "@/services/bus-stop-api.service";
import {IBusStop} from "@/interfaces/bus-stop.interface";
import store from "@/store";

onMounted(() => {
  getBusStops().then((busStops: IBusStop[]) => {
    store.dispatch('setStops', busStops);
  });
})

</script>

<template>
  <div class="header">
    <span class="header">Timetable</span>
  </div>
  <NavBar class="navigation"></NavBar>
  <router-view/>
</template>

<style>
@import url(https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap);

#app {
  background: rgba(243, 244, 249, 1);
  height: 100vh;
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
}

.header {
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
}

.header {
  display: flex;
  padding: 4px 0;
  align-items: center;
  gap: 24px;
}

.navigation {
  margin-top: 24px;
}
</style>
