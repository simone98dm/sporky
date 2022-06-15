import { getUserInfo } from "@/utils/httputils";
import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    username: "",
  }),
  getters: {
    getUsername(): string {
      return this.username;
    },
  },
  actions: {
    async retriveUsername(token: string) {
      const user = await getUserInfo(token);
      if (user) {
        this.username = user.display_name;
      }
    },
  },
});
