import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface AuthState {
	accessToken: boolean;
	setAccessToken: (accessToken: boolean) => void;
}

const authStore = (set: any) => ({
	accessToken: false,
	setAccessToken: (accessToken: boolean) => set({ accessToken }),
});

const useAuthStore = create<AuthState>()(
	devtools(
		persist(authStore, {
			name: "access-token",
		})
	)
)

export default useAuthStore;