export const useCompany = () => {
    const { $api } = useNuxtApp();

    const getCompany = async (companyId: string) => {
        try {
            const response = await $api.get(`/api/company/${companyId}`);
            return response.data;
        } catch (error) {
            if(error.status === 401){
                navigateTo('/login');
            }
        }
    };

    const getAllCompany = async () => {
        try {
            const response = await $api.get(`/api/companies`);
            return response.data;
        }catch(error) {
            return null
        }
    }

    return { getCompany, getAllCompany };
};
