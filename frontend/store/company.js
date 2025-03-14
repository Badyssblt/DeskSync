export const useLocalCompany = defineStore(
    "company",
    () => {
        const companyId = ref(null)

        const setCompany = (id) => {
            companyId.value = id
        }

        const getCompany = () => {
            return companyId.value
        }

        return {
            setCompany,
            getCompany,
            companyId,
        }
    },
    {
        persist: true
    }
);
