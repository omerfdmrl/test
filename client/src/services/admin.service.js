import Api from "./api.service";
export default {
    async getSettings(credentials = []) {
        return await Api("admin/get-settings", credentials)
    },
    async changeImage(credentials = []) {
        return await Api("admin/change-image", credentials)
    },
    async saveSettings(credentials = []) {
        return await Api("admin/save-settings", credentials)
    },
    async menuList(credentials = []) {
        return await Api("admin/menu-list", credentials)
    },
    async menuAdd(credentials = []) {
        return await Api("admin/menu-add", credentials)
    },
    async menuDelete(credentials = []) {
        return await Api("admin/menu-delete", credentials)
    },
    async menuSave(credentials = []) {
        return await Api("admin/menu-save", credentials)
    },
    async userList(credentials = []) {
        return await Api("admin/user-list", credentials)
    },
    async userSave(credentials = []) {
        return await Api("admin/user-save", credentials)
    },
    async userLoginAs(credentials = []) {
        return await Api("admin/user-login-as", credentials)
    },
    async userChangeImage(credentials = []) {
        return await Api("admin/user-change-image", credentials)
    },
    async categoryList(credentials = []) {
        return await Api("admin/category-list", credentials)
    },
    async pageList(credentials = []) {
        return await Api("admin/page-list", credentials)
    },
    async categoryAdd(credentials = []) {
        return await Api("admin/category-add", credentials)
    },
    async categorySave(credentials = []) {
        return await Api("admin/category-save", credentials)
    },
    async categoryDelete(credentials = []) {
        return await Api("admin/category-delete", credentials)
    },
    async pageAdd(credentials = []) {
        return await Api("admin/page-add", credentials)
    },
    async pageSave(credentials = []) {
        return await Api("admin/page-save", credentials)
    },
    async pageDelete(credentials = []) {
        return await Api("admin/page-delete", credentials)
    },
    async cityDelete(credentials = []) {
        return await Api("admin/city-delete", credentials)
    },
    async roleList(credentials = []) {
        return await Api("admin/role-list", credentials)
    },
    async roleAdd(credentials = []) {
        return await Api("admin/role-add", credentials)
    },
    async roleSave(credentials = []) {
        return await Api("admin/role-save", credentials)
    },
    async cityList(credentials = []) {
        return await Api("admin/city-list", credentials)
    },
    async cityAdd(credentials = []) {
        return await Api("admin/city-add", credentials)
    },
    async citySave(credentials = []) {
        return await Api("admin/city-save", credentials)
    },
    async permissionList(credentials = []) {
        return await Api("admin/permission-list", credentials)
    }
}