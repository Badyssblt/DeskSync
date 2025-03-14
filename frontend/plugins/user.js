import {jwtDecode} from "jwt-decode";

export default defineNuxtPlugin((nuxtApp) => {
    const token = useCookie("token")
    const route = useRoute();

    const decodeToken = () => {
        if(!token.value){
            if (route.path !== '/login') {
                navigateTo('/login');
            }
            return;
        }
        try {
            return jwtDecode(token.value);
        } catch (error) {
            console.error("Invalid token", error);
            return null;
        }
    };

    const getTokenExpiration = (token) => {
        const decoded = decodeToken(token);
        return decoded ? decoded.exp * 1000 : null;
    };

    const isTokenValid = () => {
        const expiration = getTokenExpiration();
        console.log(expiration);
        return expiration ? Date.now() < expiration : false;
    };

    nuxtApp.provide("decodeToken", decodeToken);
    nuxtApp.provide("getTokenExpiration", getTokenExpiration);
    nuxtApp.provide("isTokenValid", isTokenValid);
});