import Api from "./api.service";
export default {
    async userGetEdit(credentials = []) {
        return await Api("panel/user-get-edit", credentials)
    },
    async userSaveEdit(credentials = []) {
        return await Api("panel/user-save-edit", credentials)
    },
    async userChangeImage(credentials = []) {
        return await Api("panel/user-change-image", credentials)
    },
    async businessList(credentials = []) {
        return await Api("panel/business-list", credentials)
    },
    async businessAdd(credentials = []) {
        return await Api("panel/business-add", credentials)
    },
    async businessGetEdit(credentials = []) {
        return await Api("panel/business-get-edit", credentials)
    },
    async businessSaveEdit(credentials = []) {
        return await Api("panel/business-save-edit", credentials)
    },
    async businessDelete(credentials = []) {
        return await Api("panel/business-delete", credentials)
    },
    async businessDeleteImage(credentials = []) {
        return await Api("panel/business-delete-image", credentials)
    },
    async businessUploadImage(credentials = []) {
        return await Api("panel/business-upload-image", credentials)
    },
}