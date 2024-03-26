export const useUserStore  = defineStore("user", () => {
    const authenticated = useCookie('authenticated')
    const id = useCookie('id')
    authenticated.value = false

    return {authenticated, id}
})