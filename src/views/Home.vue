<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Welcome to Your Vue + Rust App</h1>
    <!-- wasm examples -->
    <h1>Rust/WASM Demos</h1>
    <h2>Alert Demo</h2>
    <button v-on:click="greet()">Say Hello</button>
    <br />
    <h2>Julia Set Demo</h2>
    <button v-on:click="draw()">Draw Julia Set</button>
    <br />
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class Home extends Vue {
  async greet(): Promise<void> {
    const { greet } = await import("../wasm/pkg");
    greet();
  }

  async draw(): Promise<void> {
    try {
      const { draw } = await import("../wasm/pkg");
      const canvas: HTMLCanvasElement = document.getElementById(
        "drawing"
      ) as HTMLCanvasElement;
      const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      const height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      canvas.width = width;
      canvas.height = height;
      const ctx: CanvasRenderingContext2D = canvas.getContext(
        "2d"
      ) as CanvasRenderingContext2D;
      draw(ctx, width, width, this.realInput, this.imaginaryInput);
    } catch (error) {
      console.error(error);
    }
  }

  realInput = -0.15;
  imaginaryInput = 0.65;
}
</script>
