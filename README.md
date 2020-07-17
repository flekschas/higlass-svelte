<h1 align="center">
  HiGlass-Svelte Component
</h1>

<div align="center">
  
  **You 😍 [Svelte](https://svelte.dev)? We too! 😘 With `higlass-svelte` you can easily use [HiGlass](https://higlass.io) in your Svelte app! 🥰**
  
</div>

<br/>

<div align="center">
  
  [![NPM Version](https://img.shields.io/npm/v/piling.js.svg?style=flat-square&color=7f99ff)](https://npmjs.org/package/higlass-svelte)
  [![Build Status](https://img.shields.io/travis/flekschas/higlass-svelte?color=a17fff&style=flat-square)](https://travis-ci.org/flekschas/higlass-svelte/)
  [![File Size](http://img.badgesize.io/https://unpkg.com/higlass-svelte/HiGlass.svelte?compression=gzip&style=flat-square&color=e17fff)](https://unpkg.com/higlass-svelte/HiGlass.svelte)
  [![Code Style Prettier](https://img.shields.io/badge/code%20style-prettier-ff7fe1.svg?style=flat-square)](https://github.com/prettier/prettier#readme)
  
</div>

## Install

```
npm i higlass-svelte
```

## Get Started

```
<script>
  import HiGlass from 'higlass-svelte';

  const viewConfig = 'https://higlass.io/api/v1/viewconfs?d=default';
  const options = {
    sizeMode: 'bounded'
  };

  let api;
  $: if (api) {
    console.log('HiGlass is ready...');
  }
</script>

<HiGlass
  viewConfig={viewConfig}
  options={options}
  bind:api={api}
/>
```

## Development

First run:

```
git clone https://github.com/flekschas/higlass-svelte
cd higlass-svelte
npm install
npm run dev
```

Then go to: [http://localhost:5000](http://localhost:5000)
