<script>
  import CodeMirror from './CodeMirror.svelte';
  import HiGlass from './HiGlass.svelte';
  import debounce from 'lodash/debounce';

  const viewConfigBaseUrl = 'https://higlass.io/api/v1/viewconfs?d=';
  const options = {
    sizeMode: 'bounded'
  };

  let viewConfigId = 'default';
  let whenViewConfig;
  let viewConfig;
  let codeMirrorViewConfig;
  let api;
  let error;

  let codeMirrorSet;

  const loadViewConfig = async () => {
    console.log('load view config', viewConfigId);
    whenViewConfig = fetch(`${viewConfigBaseUrl}${viewConfigId}`)
      .then((response) => {
        if (response.ok) return response.json();
        return new Error(response.status);
      });

    try {
      viewConfig = await whenViewConfig;
    } catch(e) {
      error = 'Could not load viewConfig.';
      console.error(e);
    }
  }
  const loadViewConfigDb = debounce(loadViewConfig, 500);

  const viewConfigChangeHandler = (event) => {
    codeMirrorViewConfig = JSON.parse(event.detail.value);
    viewConfig = codeMirrorViewConfig;
  }
  const viewConfigChangeHandlerDb = debounce(viewConfigChangeHandler, 2000);

  $: if (api) {
    console.log('HiGlass is ready...');
  }
  $: loadViewConfigDb(viewConfigId);
  $: if (codeMirrorSet && viewConfig && viewConfig !== codeMirrorViewConfig) {
    codeMirrorSet(JSON.stringify(viewConfig, null, 2), 'json');
  }

  // Init
  loadViewConfig();
</script>

<main class="app">
  {#if !api}
    <div class="loading">
      {#if error}
        <span>{error}</span>
      {:else}
        <span>Loading HiGlass...</span>
      {/if}
    </div>
  {/if}
  <header>
    <div class="center"><strong>HiGlass-Svelte Demo</strong></div>
    <div class="center">
      <span>Enter a viewconfig from higlass.io: </span>
      <input
        type="text"
        placeholder="default"
        bind:value={viewConfigId}
      >
    </div>
    {#if whenViewConfig}
      {#await whenViewConfig}
        ...
      {/await}
    {/if}
  </header>
  <div class="higlass-wrapper">
    {#if viewConfig}
      <HiGlass
        viewConfig={viewConfig}
        options={options}
        bind:api={api}
      />
    {/if}
  </div>
  <div class="codemirror-wrapper">
    <CodeMirror bind:set={codeMirrorSet} on:change={viewConfigChangeHandlerDb} />
  </div>
</main>

<style>
  main {
    position: absolute;
    width: 100vw;
    height: 100vh;
  }

  header {
    position: absolute;
    z-index: 1;
    top: 1rem;
    right: 1rem;
    left: 1rem;
    height: 5rem;
    line-height: 2.5rem;
  }

  header input {
    height: 2.5rem;
    margin-left: 0.5rem;
    border: 1px solid #bbb;
    border-radius: 0.25rem;
  }

  .loading {
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(240, 240, 240, 0.9);
  }

  .center {
    display: flex;
    justify-content: center;
  }

  .higlass-wrapper {
    position: absolute;
    z-index: 1;
    top: 6rem;
    right: 50%;
    bottom: 1rem;
    left: 1rem;
  }

  .codemirror-wrapper {
    position: absolute;
    z-index: 1;
    top: 6rem;
    right: 1rem;
    bottom: 1rem;
    left: 50%;
    padding: 10px;
  }
</style>
