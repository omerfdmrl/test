<template>
  <div class="container-fluid pt-5 pb-3 border-bottom px-lg-5 mt-10">
    <div class="row">
      <div class="col-xl-8">
        <h1>Stay on Manhattan, NY</h1>
        <p class="lead text-muted">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi.
        </p>
      </div>
    </div>
  </div>
  <div class="container-fluid py-5 px-lg-5">
    <div class="row">
      <div class="col-lg-3 pt-3">
        <form class="pe-xl-3" action="#" autocomplete="off">
          <div class="mb-4">
            <label class="form-label" for="form_guests">{{ $t('category') }}</label>
            <select2 v-if="s_categories.length" v-model="data.category" :options="s_categories" class="w-100 form-control"></select2>
          </div>
          <div class="mb-4">
            <label class="form-label" for="form_guests">{{ $t('city') }}</label>
            <select2 v-if="s_cities.length" v-model="data.city" :options="s_cities" class="w-100 form-control"></select2>
          </div>
          <div class="mb-4">
            <label class="form-label" for="form_guests">{{ $t('district') }}</label>
            <select2 v-if="s_districts.length" v-model="data.district" :options="s_districts" class="w-100 form-control"></select2>
          </div>
          <!-- <div class="mb-4">
              <button class="btn btn-primary" type="submit"> <i class="fas fa-filter me-1"></i>{{ $t('filter') }}</button>
          </div> -->
        </form>
      </div>
      <div class="col-lg-9">
        <div
          class="
            d-flex
            justify-content-between
            align-items-center
            flex-column flex-md-row
            mb-4
          "
        >
          <div class="me-3">
            <p class="mb-3 mb-md-0"><strong>{{ total }}</strong> {{ $t('results_found') }}</p>
          </div>
        </div>
        <div class="row">
          <!-- place item-->
          <div
            class="col-sm-6 col-xl-4 mb-5 hover-animate"
            v-for="(item, index) in items"
            :key="index"
          >
            <div class="card h-100 border-0 shadow">
              <div class="card-img-top overflow-hidden gradient-overlay">
                <img
                  class="img-fluid"
                  :src="item.images[0]"
                /><router-link class="tile-link" :to="{name: 'site-business', params: { slug: item.slug }}"></router-link>
                <div class="card-img-overlay-bottom z-index-20">
                  <div class="d-flex text-white text-sm align-items-center">
                    <img
                      class="avatar avatar-border-white flex-shrink-0 me-2"
                      :alt="item.user.name.first + ' ' + item.user.name.last"
                      :src="item.user.image"
                    />
                    <div>{{ item.user.name.first + ' ' + item.user.name.last }}</div>
                  </div>
                </div>
              </div>
              <div class="card-body d-flex align-items-center">
                <div class="w-100">
                  <h6 class="card-title">
                    <router-link
                      class="text-decoration-none text-dark"
                      :to="{name: 'site-business', params: { slug: item.slug }}"
                      >{{ item.title }}</router-link
                    >
                  </h6>
                  <div class="d-flex card-subtitle mb-3">
                    <p class="flex-grow-1 mb-0 text-muted text-sm">
                    </p>
                    <p class="flex-shrink-1 mb-0 card-stars text-xs text-end">
                      <i class="fa fa-star text-warning"></i
                      ><i class="fa fa-star text-warning"></i
                      ><i class="fa fa-star text-warning"></i
                      ><i class="fa fa-star text-warning"></i
                      ><i class="fa fa-star text-warning"></i>
                    </p>
                  </div>
                  <p class="card-text text-muted">
                    <span class="h4 text-primary">{{ item.price }} ₺</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Pagination -->
        <nav aria-label="Page navigation example">
          <ul
            class="pagination pagination-template d-flex justify-content-center"
          >
            <li v-if="data.currentPage > 1" class="page-item">
              <a @click="data.currentPage++"  class="page-link" href="#">
                <i class="fa fa-angle-left"></i
              ></a>
            </li>
            <li v-for="(item,index) in pageCount" :key="index" class="page-item active">
              <a @click="data.currentPage = index" class="page-link" href="#">{{ index + 1 }}</a>
            </li>
            <li v-if="data.currentPage !== pageCount" class="page-item">
              <a @click="data.currentPage--" class="page-link" href="#">
                <i class="fa fa-angle-right"></i
              ></a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import siteService from '@/services/site.service'
export default {
  props: ['cities', 'categories'],
  data(){
    return {
      data: {
        currentPage: 0,
        perPage: 10
      },
      items: {},
      pageCount: 0,
      total: 0,
      interval: null,
      s_cities: [],
      s_districts: [],
      s_categories: []
    }
  },
  methods:{
    async get(){
      const response = await siteService.filter(this.data)
        if(response.status == 1){
            this.items = response.items
            this.pageCount = response.pageCount
            this.total = response.total
        }
    },
    load(){
      this.s_cities = []
      this.s_districts = []
      this.s_categories = []
      this.categories.forEach(element => {
        this.s_categories.push({
          id: element._id,
          text: element.title
        })
      });
      if(this.$route.query.category){
        var _c = this.s_categories.filter(element => {
          return element.text === this.$route.query.category
        })
        if(_c[0]){
          this.data.category = _c[0].id
        }
      }

      this.cities.forEach(element => {
        this.s_cities.push({
          id: element._id,
          text: element.title
        })
      });
      if(this.$route.query.city){
        var _i = this.s_cities.filter(element => {
          return element.text === this.$route.query.city
        })
        if(_i[0]){
          this.data.city = _i[0].id
        }
      }
      clearTimeout(this.interval)
      this.interval = setTimeout(() => {
          this.get()
      }, 1000);
    }
  },  
  created(){
    this.load()
  },
  watch: {
    'categories'(){
      this.load()
    },
    'data.district'(){
      clearTimeout(this.interval)
      this.interval = setTimeout(() => {
          this.get()
      }, 1000);
    },
    'data.city'(){
      this.s_districts = this.cities.filter((a) => {
        return a._id == this.data.city
      })[0].district
      clearTimeout(this.interval)
      this.interval = setTimeout(() => {
          this.get()
      }, 1000);
      if(this.$route.query.district){
        var _d = this.s_districts.filter(element => {
          return element === this.$route.query.district
        })
        if(_d[0]){
          this.data.district = _d[0]
        }
      }
    }
  }
}
</script>

<style>
.mt-10 {
  margin-top: 6rem;
}
</style>