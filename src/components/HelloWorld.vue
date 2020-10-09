<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>Rust/WASM Demos</h1>
    <h2>Alert Demo</h2>
    <button v-on:click="greet()">Say Hello</button>
    <br />
    <h2>Julia Set Demo</h2>
    <button v-on:click="draw()">Draw Julia Set</button>
    <br />
    <canvas id="drawing" width="600" height="600"></canvas>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    msg: String
  }
})
export default class HelloWorld extends Vue {
  setup(): void {
    this.draw();
  }

  async greet(): Promise<void> {
    const { greet } = await import("../wasm/pkg");
    greet();
  }

  async draw(): Promise<void> {
    const { draw } = await import("../wasm/pkg");
    const canvas: HTMLCanvasElement = document.getElementById(
      "drawing"
    ) as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D = canvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    draw(ctx, 600, 600, this.realInput, this.imaginaryInput);
  }

  realInput = -0.15;
  imaginaryInput = 0.65;
  msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
