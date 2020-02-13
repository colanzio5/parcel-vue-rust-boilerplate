<template>
  <div>
    <h1>Vue+WASM+Parcel</h1>
    <canvas id="canvas" height="150" width="150" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
import { start } from "../wasm/Cargo.toml";

@Component({})
export default class App extends Vue {
  // rust/wasm code can only
  // be called after mounted hook
  mounted() {
    start();
  }
}
</script>
