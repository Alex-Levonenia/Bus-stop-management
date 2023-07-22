<script setup lang="ts">
import {computed, ref} from "vue";
import store from "@/store";
import {IBusStop} from "@/interfaces/bus-stop.interface";

const selectedBusLine = ref();
const selectedBusStop = ref();

const emptyContainerPlaceholder = computed(() => isAnyBusLineSelected.value ? 'Please select the bus stop first' : 'Please select the bus line first');

const busLineNumbers = computed(() => {
  const numbers = Array.from(new Set(store.getters.getStops.map((stop: IBusStop) => stop.line)));
  return numbers.sort();
});

const availableStops = computed(() => {
  if (!selectedBusLine.value) {
    return [];
  }

  const stops: IBusStop[] = [];
  store.getters.getStops.forEach((stop: IBusStop) => {
    if (stop.line === selectedBusLine.value && !stops.some((pushedStop: IBusStop) => pushedStop.stop === stop.stop)) {
      stops.push(stop);
    }
  });

  return stops.sort((a: IBusStop, b: IBusStop) => a.order - b.order);
});

const availableTime = computed(() => {
  if (!selectedBusStop.value) {
    return [];
  }

  const suitableTimeItems: string[] = Array.from(new Set(store.getters.getStops
      .filter((stop: IBusStop) => stop.line === selectedBusLine.value && stop.stop === selectedBusStop.value.stop)
      .map((stop: IBusStop) => stop.time)));

  return suitableTimeItems
      .sort((a: string, b: string) => {
        return Date.parse('1970/01/01 ' + a.slice(0, -2) + a.slice(-2)) - Date.parse('1970/01/01 ' + b.slice(0, -2) + b.slice(-2));
      });
});

const isAnyBusLineSelected = computed(() => !!selectedBusLine.value);
const isAnyBusStopSelected = computed(() => !!selectedBusStop.value);

function selectBusLine(lineNumber: number) {
  selectedBusLine.value = lineNumber;
  selectedBusStop.value = null;
}

function isBusLineSelected(lineNumber: number) {
  return selectedBusLine.value === lineNumber;
}

function selectBusStop(stop: IBusStop) {
  selectedBusStop.value = stop;
}

function isBusStopSelected(stop: IBusStop) {
  return selectedBusStop.value === stop;
}
</script>

<template>
  <div class="lines-wrapper">
    <div class="header-wrapper">
      <div class="header">
        <span class="header-text">Select Bus Line</span>
      </div>
      <div class="line-selection">
        <div v-for="lineNumber in busLineNumbers" :key="lineNumber"
             @click="selectBusLine(lineNumber)"
             :class="{'selected': isBusLineSelected(lineNumber)}"
             class="btn-bus-line">
          <span class="line-number no-selection">{{ lineNumber }}</span>
        </div>
      </div>
    </div>

    <div class="footer-wrapper">
      <div class="selection-container-wrapper" :class="{'empty-container': !isAnyBusLineSelected}">
        <span v-if="!isAnyBusLineSelected" class="empty-container-placeholder no-selection">{{
            emptyContainerPlaceholder
          }}</span>
        <template v-else>
          <div class="selection-container-header">
            <span class="bus-line-header">Bus Line: {{ selectedBusLine }}</span>
          </div>
          <div class="selection-container">
            <table class="table table-hover">
              <thead>
              <tr class="col-12">
                <th class="col-12"><span class="table-header no-selection">Bus Stops</span></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="stop in availableStops" :key="stop.stop" class="col-12">
                <td class="col-12" @click="selectBusStop(stop)">
                  <span class="table-text" :class="{'selected-stop': isBusStopSelected(stop)}">{{ stop.stop }}</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </template>
      </div>
      <div class="time-selection" :class="{'empty-container': !isAnyBusStopSelected}">
        <span v-if="!isAnyBusStopSelected" class="empty-container-placeholder no-selection">{{
            emptyContainerPlaceholder
          }}</span>
        <template v-else>
          <div class="selection-container-header">
            <span class="bus-line-header">Bus Stop: {{ selectedBusStop.stop }}</span>
          </div>
          <div class="selection-container">
            <table class="table table-hover">
              <thead>
              <tr class="col-12">
                <th class="col-12"><span class="table-header no-selection">Time</span></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="time in availableTime" :key="time" class="col-12">
                <td class="col-12 cursor-default">
                  <span class="table-text">{{ time }}</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>

.selected-stop {
  color: #1952E1 !important;
}

.table-header {
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.012px;
}

.table-text {
  color: #33373C;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
}

.selection-container {
  flex-grow: 1;
  width: 100%;
  min-height: 1px;
  display: flex;
}

.bus-line-header {
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
}

.selection-container-header {
  display: flex;
  padding: 24px 24px 8px 24px;
}

.empty-container-placeholder {
  color: #63666E;
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}

.empty-container {
  border: 2px dashed #9A9DA4;
}

.header-wrapper {
  background-color: #FFF;
  border-radius: 4px;
}

.selection-container-wrapper {
  background-color: #FFF;
  border-radius: 4px;
  height: 100%;
  flex: 0 0 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.time-selection {
  background-color: #FFF;
  border-radius: 4px;
  height: 100%;
  margin-left: 16px;
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.footer-wrapper {
  display: flex;
  margin-top: 16px;
  flex-grow: 1;
  min-height: 1px;
}

.selected {
  background-color: #2E3E6E !important;
}

.btn-bus-line {
  display: flex;
  width: 54px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: #1952E1;
  cursor: pointer;
}

.line-number {
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  color: #FFF;
}

.line-selection {
  padding: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  border-radius: 4px;
}

.lines-wrapper {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  min-height: 1px;
}

.header {
  padding: 24px 24px 8px 24px;
  border-radius: 4px;
}

.header-text {
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
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
