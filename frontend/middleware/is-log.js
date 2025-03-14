import {useAuth} from "~/store/auth.js";

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useAuth()

    if (!store.isAuthenticated) {
        return navigateTo('/login');
    }

});
