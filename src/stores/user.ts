import { getUserInfo } from "@/utils/http";
import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    username: "",
    theme: "light",
  }),
  getters: {
    getUsername(state): string {
      return state.username;
    },
    getTheme(state): string {
      return state.theme;
    },
  },
  actions: {
    async retriveUsername(token: string) {
      const user = await getUserInfo(token);
      if (user) {
        this.username = user.display_name;
      }
    },
    setTheme(theme: string) {
      this.theme = theme;
    },
  },
});
