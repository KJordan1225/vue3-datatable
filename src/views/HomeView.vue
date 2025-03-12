<script setup>
import { useUserStore } from "@/stores/user";
import { useDataTable2Store } from "@/stores/datatable2";
import DataTable2 from '@/components/childComponents/DataTable2.vue';
import { ref, onMounted } from 'vue';

const data = ref([]);
const user = ref([]);

// For DataTable2
const rows = ref([]);


const userStore = useUserStore();
const datatable2Store = useDataTable2Store();

onMounted(async() => {  
  datatable2Store.setRows(await userStore.getAllRegUsers());

  //update database approved status
  await datatable2Store.update();
  
});


</script>


<template>
  <main>
    <span>DATATABLE EXAMPLE</span>
    <!-- SECOND DATATABLE  -->
    <DataTable2 />
  </main>
</template>
