<template>
    <section>
      <p>This page will be displayed at the /about route.</p>
      <NuxtLink to="/">
    About page
  </NuxtLink>
      <button v-on:click="clickEvent()"></button>
    </section>
  </template>
  <script setup>
  const clickEvent= async ()=>{
    await  navigateTo("/routeP")}
  </script>