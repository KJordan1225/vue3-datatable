<template>    
    <div class="table-container">
        <div>
            <h2>
                Second Table
            </h2>
            <p>
                Tracking non-selected rows
            </p>
        </div>
      <table>
        <thead>
          <tr>            
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>
                <div> 
                    <label for="contact-selectAll">            
                        <input
                        id="contact-selectAll"
                        type="checkbox"
                        value=""
                        @change="toggleAll"
                        :checked="isAllSelected"
                        >
                        Approved
                    </label> 
                </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.id">            
            <td>{{ row.id }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.email }}</td>
            <td>
              <input type="checkbox" v-model="row.selected">
            </td>
          </tr>
        </tbody>
      </table>
  
      <div>
        <button @click="selectAll">Select All</button>
        <button @click="deselectAll">Deselect All</button>
        <button @click="updateDatabase">Update Database</button>
      </div>
    </div> 

    <div>  
        <h3>Selected Rows in Store:</h3>
        <ul>
            <li v-for="row in selectedRows" :key="row.id">
            {{ row.id }} (Name: {{ row.name }})
            </li>
        </ul>
    </div>   

    <div>  
        <h3>Non-Selected Rows in Store:</h3>
        <ul>
            <li v-for="row in nonSelectedRows" :key="row.id">
            {{ row.id }} (Name: {{ row.name }})
            </li>
        </ul>
    </div> 
  </template>
  
  <script setup>
  import { storeToRefs } from 'pinia';
  import { useDataTable2Store } from '@/stores/datatable2';
  import {computed} from 'vue';
  
  const store = useDataTable2Store();
  const { rows, selectedRows, nonSelectedRows } = storeToRefs(store);
  
  
  function selectAll() {
    store.selectAll();
  }
  
  function deselectAll() {
    store.deselectAll();
  }
  
  function toggleAll(event) {
    event.target.checked ? selectAll() : deselectAll();
  }
  
  const isAllSelected = computed(() => {
    return rows.value.every(row => row.selected);
  });

  function updateDatabase(){
    store.update();
  }
  </script>

  <style scoped>
/* General Table Styling */
.table-container {
    max-width: 800px;
    margin: 40px auto;
    font-family: Arial, sans-serif;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

/* Header Styling */
thead {
    background-color: #007bff;
    color: white;
}

th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

/* Alternating Row Colors */
tbody tr:nth-child(even) {
    background-color: #f2f2f2;
}

/* Hover Effect */
tbody tr:hover {
    background-color: #ddd;
    cursor: pointer;
    transition: 0.3s;
}

/* Responsive Table */
@media (max-width: 600px) {
    table {
        font-size: 14px;
    }
    th, td {
        padding: 10px;
    }
}
</style>
  