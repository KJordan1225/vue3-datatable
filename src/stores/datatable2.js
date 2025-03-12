// store/useDataTableStore.js
import { defineStore } from 'pinia';

export const useDataTable2Store = defineStore('dataTable2Store', {
  state: () => ({
    rows: [],    
  }),
  getters: {
    selectedRows: (state) => state.rows.filter(row => row.selected),
    nonSelectedRows: (state) => state.rows.filter(row => !row.selected)
  },
  actions: {
    toggleSelection(rowId) {
      const row = this.rows.find(r => r.id === rowId);
      if (row) {
        row.selected = !row.selected;
      }
    },
    selectAll() {
      this.rows.forEach(row => row.selected = true);
    },
    deselectAll() {
      this.rows.forEach(row => row.selected = false);
    },

    /********************* Set datatable rows info (onMounted) *****/
    setRows(newData) {
        this.rows = newData;

        // Set DataTable rows accordingly
        let jsonArray = this.rows;
        const updatedArray = jsonArray.map(item => ({
            ...item,
            selected: item.selected === 1 ? true : false
        }));
        this.rows = updatedArray;
    },  

     /******************* Update approved status *******************/
     async update() {

        for ( let row of this.selectedRows) { 

            const userData = {                    
                selected: 1
            };  
            
            // update approved column in database
            const res = await fetch(`/api/users/${row.id}`, {
                method: "put",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(userData),
              });

              const data = await res.json();

              if (data.errors) {
                this.errors = data.errors;
              } else {
                this.errors = {}
              }

        }

        for ( let row of this.nonSelectedRows) {              

            const userData = {                    
                selected: 0
            };  
            
            // update approved column in database
            const res = await fetch(`/api/users/${row.id}`, {
                method: "put",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(userData),
              });

              const data = await res.json();

              if (data.errors) {
                this.errors = data.errors;
              } else {
                this.errors = {}
              }

        }
               
      }
  },  
});
