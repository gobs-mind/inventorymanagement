const baseUrl : string = "http://localhost:8081";

export const ApiUrl = {
    
    checkEmployee : `${baseUrl}/employee/validate`,
    getVendors : `${baseUrl}/vendors`,
    addProduct : `${baseUrl}/product`,
    addRequest : `${baseUrl}/requests`,
    getAllProducts : `${baseUrl}/product`,
    getProduct : `${baseUrl}/product/`,
    updateProduct : `${baseUrl}/product/`,
    updateRequest : `${baseUrl}/requests`,
    deleteProduct : `${baseUrl}/product/`,
    getList : `${baseUrl}/requests/pending/`,
    getRequest : `${baseUrl}/requests/`,
    deleteRequest : `${baseUrl}/requests/`,
}