export const useSearchStore  = defineStore('search', () => {
    const from = ref()
    const where = ref()
    const date= ref()
    const type = ref()

    return {from, where, date, type}
})