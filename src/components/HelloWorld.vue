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
  </div>
</template>

<style lang="scss">
#drawing {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    msg: String
  }
})
export default class HelloWorld extends Vue {
  async setup(): Promise<void> {
    await this.draw();
  }

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
