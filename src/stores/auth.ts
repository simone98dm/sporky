import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    isLogged: false,
    token: "",
  }),
  actions: {
    login(token: string) {
      this.token = token;
      this.isLogged = true;
    },
  },
});
