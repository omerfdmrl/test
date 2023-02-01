import Api from "./api.service";
export default {
    async info(credentials = []) {
        return await Api("main/info", credentials)
    },
    async categoryList(credentials = []) {
        return await Api("main/category-list", credentials)
    },
    async cityList(credentials = []) {
        return await Api("main/city-list", credentials)
    }
}