<template>
    <header class="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
        <div class="container-fluid px-4">
            <div class="page-header-content">
                <div class="row align-items-center justify-content-between pt-3">
                    <div class="col-auto mb-3">
                        <h1 class="page-header-title">
                            <div class="page-header-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-plus"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg></div>
                            {{ $t('add_new_business') }}
                        </h1>
                    </div>
                    <div class="col-12 col-xl-auto mb-3">
                        <router-link :to="{name: 'panel-business-list'}" class="btn btn-sm btn-light text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left me-1"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                            {{ $t('back_to_all_business') }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <div class="container-fluid px-4">
        <div class="row gx-4">
            <div class="col-lg-8">
                <div class="card mb-4">
                    <div class="card-header">{{ $t('title') }}</div>
                    <div class="card-body"><input @input="data.slug = urlify(data.title)" v-model="data.title" class="form-control" id="postTitleInput" type="text" :placeholder="$t('enter_your_title...')"></div>
                </div>
                <div class="card card-header-actions mb-4">
                    <div class="card-header">
                        {{ $t('content') }}
                    </div>
                    <div class="card-body">
                        <QuillEditor @ready="ready" id="ql-editor" :placeholder="$t('enter_your_content...')" :toolbar="toolbar" theme="snow" />
                    </div>
                </div>
                <div class="card mb-4">
                    <div class="card-header">{{ $t('dates') }}</div>
                    <div class="card-body table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">{{  $t('monday')  }}</th>
                                <th scope="col">{{  $t('tuesday')  }}</th>
                                <th scope="col">{{  $t('wednesday')  }}</th>
                                <th scope="col">{{  $t('thursday')  }}</th>
                                <th scope="col">{{  $t('friday')  }}</th>
                                <th scope="col">{{  $t('saturday')  }}</th>
                                <th scope="col">{{  $t('sunday')  }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input required v-model="data.time_monday_opening" class="form-control" type="time" :placeholder="$t('enter_opening_time...')"></td>
                                    <td><input required v-model="data.time_tuesday_opening" class="form-control" type="time" :placeholder="$t('enter_opening_time...')"></td>
                                    <td><input required v-model="data.time_wednesday_opening" class="form-control" type="time" :placeholder="$t('enter_opening_time...')"></td>
                                    <td><input required v-model="data.time_thursday_opening" class="form-control" type="time" :placeholder="$t('enter_opening_time...')"></td>
                                    <td><input required v-model="data.time_friday_opening" class="form-control" type="time" :placeholder="$t('enter_opening_time...')"></td>
                                    <td><input required v-model="data.time_saturday_opening" class="form-control" type="time" :placeholder="$t('enter_opening_time...')"></td>
                                    <td><input required v-model="data.time_sunday_opening" class="form-control" type="time" :placeholder="$t('enter_opening_time...')"></td>
                                </tr>
                                <tr>
                                    <td><input required v-model="data.time_monday_closing" class="form-control" type="time" :placeholder="$t('enter_closing_time...')"></td>
                                    <td><input required v-model="data.time_tuesday_closing" class="form-control" type="time" :placeholder="$t('enter_closing_time...')"></td>
                                    <td><input required v-model="data.time_wednesday_closing" class="form-control" type="time" :placeholder="$t('enter_closing_time...')"></td>
                                    <td><input required v-model="data.time_thursday_closing" class="form-control" type="time" :placeholder="$t('enter_closing_time...')"></td>
                                    <td><input required v-model="data.time_friday_closing" class="form-control" type="time" :placeholder="$t('enter_closing_time...')"></td>
                                    <td><input required v-model="data.time_saturday_closing" class="form-control" type="time" :placeholder="$t('enter_closing_time...')"></td>
                                    <td><input required v-model="data.time_sunday_closing" class="form-control" type="time" :placeholder="$t('enter_closing_time...')"></td>
                                </tr>
                            </tbody>
                            </table>
                    </div>
                </div>
                <div class="card card-header-actions mt-4">
                    <div class="card-header">
                        {{ $t('publish') }}
                    </div>
                    <div class="card-body">
                        <div class="d-grid mb-3"><button @click="save('draft')" class="fw-500 btn btn-primary-soft text-primary">{{ $t('save_as_draft') }}</button></div>
                        <div class="d-grid"><button @click="save('published')" class="fw-500 btn btn-primary">{{ $t('submit_as_published') }}</button></div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card mb-4">
                    <div class="card-header">{{ $t('slug') }}</div>
                    <div class="card-body"><input v-model="data.slug" class="form-control" id="postTitleInput" type="text" :placeholder="$t('enter_your_title...')"></div>
                </div>
                <div class="card mb-4">
                    <div class="card-header">{{ $t('image') }}</div>
                    <div class="card-body">
                        <input accept="image/png, image/gif, image/jpeg" @change="handleImage" ref="file" class="form-control" id="postTitleInput" type="file" multiple>
                        <div class="row mt-2">
                            <div class="col-md-6" v-for="(item,index) in previews" :key="index">
                                <img type="button" :src="item.url" class="img-thumbnail" @click="deletePreview(index)">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card mb-4">
                    <div class="card-header">{{ $t('price') }}</div>
                    <div class="card-body"><input required v-model="data.price" class="form-control" id="postPriceinput required" type="number" min="20" :placeholder="$t('enter_your_price...')"></div>
                </div>
                <div class="card mb-4">
                    <div class="card-header">{{ $t('category') }}</div>
                    <div class="card-body"><Select2 :options="categories" v-model="data.category" class="form-control" id="postCategoryInput" type="text" :placeholder="$t('enter_your_category...')"></Select2></div>
                </div>
                <div class="card mb-4">
                    <div class="card-header">{{ $t('tags') }}</div>
                    <div class="card-body"><Select2 :settings="{ multiple: true, tags: true}" v-model="data.tag" class="form-control" id="postTagInput" type="text" :placeholder="$t('enter_your_tags...')"></Select2></div>
                </div>
                <div class="card mb-4">
                    <div class="card-header">{{ $t('location') }}</div>
                    <div class="card-body">
                        <Select2 v-model="data.city" :options="cities" @select="handleDistrict" class="form-control" id="postLocationInput1" type="text" :placeholder="$t('enter_your_city...')">
                        </Select2>
                        <Select2 v-if="data.city" v-model="data.district" :options="districts" class="mt-2 form-control" id="postLocationInput2" type="text" :placeholder="$t('enter_your_district...')">
                        </Select2>
                        <div class="row mt-2">
                            <div class="col-md-5">
                                <input v-model="data.latitude" :placeholder="$t('latitude')" type="text" class="form-control">
                            </div>
                            <div class="col-md-5">
                                <input v-model="data.longitude" :placeholder="$t('longitude')" type="text" class="form-control">
                            </div>
                            <div class="col-md-2">
                                <button @click="getLocation" style="padding: 11px 13px" class="btn btn-success">
    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path fill="white" d="M10 9.583q.542 0 .906-.364.365-.365.365-.886 0-.541-.365-.906-.364-.365-.906-.365t-.896.365q-.354.365-.354.906 0 .542.365.896.364.354.885.354Zm0 7.209q2.604-2.25 3.99-4.5 1.385-2.25 1.385-3.792 0-2.479-1.542-4.01Q12.292 2.958 10 2.958q-2.271 0-3.812 1.532Q4.646 6.021 4.646 8.5q0 1.542 1.375 3.792t3.979 4.5Zm0 1.166q-3.146-2.833-4.677-5.187Q3.792 10.417 3.792 8.5q0-2.938 1.864-4.667Q7.521 2.104 10 2.104t4.354 1.729q1.875 1.729 1.875 4.667 0 1.917-1.542 4.271-1.541 2.354-4.687 5.187ZM10 8.5Z"/></svg></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card mb-4">
                    <div class="card-header">
                        {{ $t('contact') }}
                    </div>
                    <div class="card-body">
                        <input type="text" v-model="data.instagram" :placeholder="$t('instagram')" class="form-control mb-2">
                        <input type="text" v-model="data.twitter" :placeholder="$t('twitter')" class="form-control mb-2">
                        <input type="tel" v-model="data.tel_no" :placeholder="$t('tel_no')" class="form-control mb-2">
                        <input type="mail" v-model="data.mail" :placeholder="$t('mail')" class="form-control mb-2">
                    </div>
                </div>
            </div>
        </div>
    </div>
    </template>
    
    <script>
    import mainService from '@/services/main.service';
    import panelService from '@/services/panel.service'
    export default {
        data(){
            return {
                data: {
                    tag: []
                },
                previews: [],
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],    
                    ['blockquote', 'code-block','image'],
    
                    [{ 'header': 1 }, { 'header': 2 }],               
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'script': 'sub'}, { 'script': 'super' }],      
                    [{ 'indent': '-1'}, { 'indent': '+1' }],          
    
                    [{ 'size': ['small', false, 'large', 'huge'] }], 
    
                    [{ 'color': [] }, { 'background': [] }],       
                    [{ 'align': [] }],
    
                    ['clean']                                         
                ],
                cities: [],
                categories: [],
                districts: [],
                cityDatas : []
            }
        },
        methods: {
            handleDistrict(){
                const districts = this.cityDatas.filter((a) => {
                    return a._id == this.data.city
                })[0].district
                this.districts = districts
            },
            deletePreview(index){
                var item = this.previews[index]
                if(!item.url.startsWith('blob')){
                    panelService.businessDeleteImage({
                        key: item.key,
                        url: item.url,
                        _id: this.$route.params.id,
                        slug: this.$route.params.slug
                    })
                }
                this.previews.splice(index, 1)
            },
            handleImage(){
                var formData = new FormData()
                for( var i = 0; i < this.$refs.file.files.length; i++ ){
                    let file = this.$refs.file.files[i];
                    formData.append('images[' + i + ']', file)
                    file.url = URL.createObjectURL(file)
                    file.key = 'images[' + i + ']'
                    this.previews.push(file)
                }
                formData.append('_id', this.$route.params.id)
                formData.append('slug', this.$route.params.slug)
                panelService.businessUploadImage(formData)
            },
            getLocation(){
                navigator.geolocation.getCurrentPosition((position) => {
                    this.data.latitude = position.coords.latitude
                    this.data.longitude = position.coords.longitude
                })
            },
            ready(editor){
                editor.getModule('toolbar').addHandler('image', () => {
                    const tooltip = editor.theme.tooltip;
                    const originalSave = tooltip.save;
                    const originalHide = tooltip.hide;
    
                    tooltip.save = function () {
                        const range = editor.getSelection(true);
                        const value = this.textbox.value;
                        if (value) {
                            editor.insertEmbed(range.index, 'image', value, 'user');
                        }
                    };
                    tooltip.hide = function () {
                        tooltip.save = originalSave;
                        tooltip.hide = originalHide;
                        tooltip.hide();
                    };
                    tooltip.edit('image');
                    tooltip.textbox.placeholder = 'Embed URL';
                });
            },
            save(status){
                this.data.status = status
                this.data.content = document.querySelector('#ql-editor .ql-editor').innerHTML
                var formData = new FormData()
                Object.keys(this.data).forEach(key => {
                    formData.append(key, this.data[key])
                });
                for( var i = 0; i < this.$refs.file.files.length; i++ ){
                    let file = this.$refs.file.files[i];
                    formData.append('images[' + i + ']', file);
                }
                this.previews.forEach((element, i) => {
                    if(!element.key){
                        formData.append('o_i['+ i +']', element.url)
                    }
                });
                formData.append('_id', this.$route.params.id)
                formData.append('o_slug', this.$route.params.slug)
                panelService.businessSaveEdit(formData)
            }
        },
        async created(){
            const response2 = await mainService.cityList()
            this.cityDatas = response2.cities
            const cities = []
            response2.cities.forEach(element => {
                cities.push({
                    id: element._id,
                    text: element.title
                })
            });
            const response = await mainService.categoryList()
            const categories = []
            response.categories.forEach(element => {
                categories.push({
                    id: element._id,
                    text: element.title
                })
            });
            this.categories = categories
            this.cities = cities

            const response3 = await panelService.businessGetEdit(this.$route.params)
            if(response3.status == 1){
                this.data.title = response3.business.title
                this.data.price = response3.business.price
                this.data.slug = response3.business.slug
                this.data.images = response3.business.images
                this.data.category = response3.business.category
                this.data.tag = response3.business.tag
                this.data.city = response3.business.location.city
                this.data.district = response3.business.location.district
                this.data.latitude = response3.business.location.latitude
                this.data.longitude = response3.business.location.longitude
                this.data.instagram = response3.business.contact.instagram
                this.data.twitter = response3.business.contact.twitter
                this.data.tel_no = response3.business.contact.tel_no
                this.data.mail = response3.business.contact.mail
                this.data.time_monday_opening = response3.business.time.monday ? response3.business.time.monday.opening : null
                this.data.time_monday_closing = response3.business.time.monday ? response3.business.time.monday.closing : null
                this.data.time_tuesday_opening = response3.business.time.tuesday.opening
                this.data.time_tuesday_closing = response3.business.time.tuesday.closing
                this.data.time_wednesday_opening = response3.business.time.wednesday.opening
                this.data.time_wednesday_closing = response3.business.time.wednesday.closing
                this.data.time_thursday_opening = response3.business.time.thursday.opening
                this.data.time_thursday_closing = response3.business.time.thursday.closing
                this.data.time_friday_opening = response3.business.time.friday.opening
                this.data.time_friday_closing = response3.business.time.friday.closing
                this.data.time_saturday_opening = response3.business.time.saturday.opening
                this.data.time_saturday_closing = response3.business.time.saturday.closing
                this.data.time_sunday_opening = response3.business.time.sunday.opening
                this.data.time_sunday_closing = response3.business.time.sunday.closing
                response3.business.images.forEach(element => {
                    this.previews.push({
                        url: element
                    })
                });
                document.querySelector('#ql-editor .ql-editor').innerHTML = response3.business.content
                if(this.data.city){
                    const districts = this.cityDatas.filter((a) => {
                        return a._id == this.data.city
                    })[0].district
                    this.districts = districts
                }
            }
        }
    }
    </script>