<script>
  import higlass from 'higlass';
  import { HiGlassComponent } from 'react';
  import { createEventDispatcher, onMount } from 'svelte';

  export let api = null;
  export let viewConfig = 'https://higlass.io/api/v1/viewconfs?d=default';
  export let options = {
    sizeMode: 'bounded'
  };
  export let debug = false;

  const dispatch = createEventDispatcher();

  let element;

  const updateHiGlass = () => {
    if (!api) return;
    if (debug) console.log('Update HiGlass...', viewConfig, options);
    api.setViewConfig(viewConfig);
    Object.entries(options).forEach(([key, value]) => {
      api.option(key, value);
    })
  }

  $: updateHiGlass(viewConfig);

  onMount(() => {
    if (debug) console.log('Initialize HiGlass...', viewConfig, options);
    api = higlass.viewer(element, viewConfig, options);
  });
</script>

<div bind:this={element} class="higlass-svelte" />

<style>
.higlass-svelte {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
