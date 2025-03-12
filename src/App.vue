<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>&nbsp;&nbsp;
        <RouterLink to="/about">About</RouterLink>&nbsp;&nbsp;
        <RouterLink to="/admin-dashboard">Admin Dashboard</RouterLink>&nbsp;&nbsp;
        <RouterLink to="/committee-dashboard">Committee Dashboard</RouterLink>&nbsp;&nbsp;
        <RouterLink to="/brothers-dashboard">Brothers Dashboard</RouterLink>&nbsp;&nbsp;
      </nav>
  </header>

  <RouterView />
</template>

