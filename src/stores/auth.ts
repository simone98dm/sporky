import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    logged: false,
    token: "",
  }),
  getters: {
    isLogged(state) {
      return state.logged;
    },
  },
  actions: {
    login(token: string) {
      this.token = token;
      this.logged = true;
    },
  },
});
