<script>
  import higlass from 'higlass';
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';

  export let api = null;
  export let viewConfig = 'https://higlass.io/api/v1/viewconfs?d=default';
  export let options = {
    sizeMode: 'bounded'
  };
  export let debug = false;

  const dispatch = createEventDispatcher();

  const updateHiGlass = () => {
    if (!api) return;
    if (debug) console.log('Update HiGlass...', viewConfig, options);
    api.setViewConfig(viewConfig);
    Object.entries(options).forEach(([key, value]) => {
      api.option(key, value);
    });
  };

  let element;
  // Only needed to ensure that the parent component cannot overwrite the
  // api reference
  let _api;

  $: updateHiGlass(viewConfig);

  onMount(() => {
    if (debug) console.log('Initialize HiGlass...', viewConfig, options);
    _api = higlass.viewer(element, viewConfig, options);
    api = _api;
    dispatch('ready');
  });

  onDestroy(() => {
    if (debug) console.log('Good bye! Destroying HiGlass now...');
    if (_api) _api.destroy();
    dispatch('destroy');
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
