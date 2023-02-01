import Api from "./api.service";
export default {
    async home(credentials = []) {
        return await Api("site/home", credentials)
    },
    async filter(credentials = []) {
        return await Api("site/filter", credentials)
    },
    async businessIndex(credentials = []) {
        return await Api("site/business-index", credentials)
    },
    async pageIndex(credentials = []) {
        return await Api("site/page-index", credentials)
    },
    async postReview(credentials = []) {
        return await Api("site/post-review", credentials)
    },
    async bookmark(credentials = []) {
        return await Api("site/bookmark", credentials)
    },
}