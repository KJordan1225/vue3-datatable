import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
    state: () => {
        return {
            user: null,
            errors: {},
            data: [],
        }
    },
    actions: {
         /****************** Get all registered users *******************/
         async getAllRegUsers() {
            const res = await fetch("/api/users");
            const data = await res.json();

            return data;
        },

        /******************* Get a user *******************/
        async getUser(id) {
            const res = await fetch(`/api/users/${id}`);
            const dataItem = await res.json();
            
            return dataItem.user;
        },

        
    },

});
