<template>
  <section class="hero-home">
      <div class="swiper-container hero-slider">
        <swiper
            class="swiper-wrapper dark-overlay"
            :pagination="{ clickable: true, dynamicBullets: true }"
            :slides-per-view="1"
            :autoplay="{
              delay: 2500
            }"
          >
          <swiper-slide style="background-image:url(/images/home/1.jpg)"></swiper-slide>
          <swiper-slide style="background-image:url(/images/home/2.jpg)"></swiper-slide>
          <swiper-slide style="background-image:url(/images/home/3.webp)"></swiper-slide>
          <swiper-slide style="background-image:url(/images/home/4.jpg)"></swiper-slide>
          <swiper-slide style="background-image:url(/images/home/5.jpg)"></swiper-slide>
          <swiper-slide style="background-image:url(/images/home/6.jpg)"></swiper-slide>
          <swiper-slide style="background-image:url(/images/home/7.jpg)"></swiper-slide>
          <swiper-slide style="background-image:url(/images/home/8.jpg)"></swiper-slide>
        </swiper>
      </div>
      <div class="container py-6 py-md-7 text-white z-index-20">
        <div class="row">
          <div class="col-xl-10">
            <div class="text-center text-lg-start">
              <i><h1 class="display-5 fw-bold text-shadow" style="white-space: pre-line;" v-html="$t('any_sport_you_want_wherever_you_want')"></h1></i>
              <p class="letter-spacing-4 mb-2 text-secondary text-shadow h2">{{ $t('search_now') }}</p>
            </div>
            <div class="search-bar mt-5 p-3 p-lg-1 ps-lg-4">
              <form @submit.prevent="search" action="#">
                <div class="row">
                  <div class="col-lg-4 d-flex align-items-center form-group">
                    <select2 v-model="data.category" :options="s_categories" class="w-100"></select2>
                  </div>
                  <div class="col-lg-3 d-flex align-items-center form-group">
                    <div class="input-label-absolute input-label-absolute-right w-100">
                      <select2 disabled v-model="data.city" :options="s_cities" class="w-100"></select2>
                    </div>
                  </div>
                  <div class="col-lg-3 d-flex align-items-center form-group no-divider">
                      <select2 v-model="data.district" :options="s_districts" class="w-100"></select2>
                  </div>
                  <div class="col-lg-2 d-grid">
                    <button class="btn btn-secondary rounded-pill h-100" type="submit">{{ $t('search') }}</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-6 bg-gray-100">
      <div class="container">
        <div class="text-center pb-lg-4">
          <h2 class="mb-5" style="white-space: pre-line;">{{ $t('easy_reservation') }}</h2>
        </div>
        <div class="row">
          <div class="col-lg-4 mb-3 mb-lg-0 text-center">
            <div class="px-0 px-lg-3">
              <div class="icon-rounded bg-primary-light mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path fill="#e83e8c" d="m16.15 37.75 7.85-4.7 7.85 4.75-2.1-8.9 6.9-6-9.1-.8L24 13.7l-3.55 8.35-9.1.8 6.9 6ZM11.65 44l3.25-14.05L4 20.5l14.4-1.25L24 6l5.6 13.25L44 20.5l-10.9 9.45L36.35 44 24 36.55ZM24 26.25Z"/></svg>
              </div>
              <h3 class="h5">{{ $t('find_the_perfect_rental') }}</h3>
              <p class="text-muted">{{ $t('find_the_perfect_rental_description') }}</p>
            </div>
          </div>
          <div class="col-lg-4 mb-3 mb-lg-0 text-center">
            <div class="px-0 px-lg-3">
              <div class="icon-rounded bg-primary-light mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path fill="#e83e8c" d="M10.6 35.95V19h3v16.95Zm12.1 0V19h3v16.95ZM4 16v-2.65l20-11.4 20 11.4V16Zm6.7-3h26.6L24 5.4ZM4 41.95v-3h25q.1.7.175 1.425.075.725.375 1.575ZM34.4 27.4V19h3v6.9ZM40 48q-3.45-.85-5.725-3.975Q32 40.9 32 37.1V32l8-4 8 4v5.1q0 3.8-2.275 6.925T40 48Zm-1.05-6 7.1-7.1-1.4-1.4-5.7 5.7L36 36.25l-1.4 1.4ZM10.7 13h26.6Z"/></svg>
              </div>
              <h3 class="h5">{{ $t('secure_payment') }}</h3>
              <p class="text-muted">{{ $t('secure_payment_description') }}</p>
            </div>
          </div>
          <div class="col-lg-4 mb-3 mb-lg-0 text-center">
            <div class="px-0 px-lg-3">
              <div class="icon-rounded bg-primary-light mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path fill="#e83e8c" d="M24 24Zm0 20q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q2.3 0 4.425.5T32.5 5.9v3.35q-1.9-1.1-4.025-1.675Q26.35 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41q7.1 0 12.05-4.975Q41 31.05 41 24q0-1.75-.325-3.375T39.7 17.5h3.2q.55 1.55.825 3.15Q44 22.25 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm16.5-30V9.5H36v-3h4.5V2h3v4.5H48v3h-4.5V14Zm-9.2 7.35q1.15 0 1.925-.8.775-.8.775-1.9 0-1.15-.775-1.925-.775-.775-1.925-.775-1.1 0-1.9.775-.8.775-.8 1.925 0 1.1.8 1.9.8.8 1.9.8Zm-14.6 0q1.15 0 1.925-.8.775-.8.775-1.9 0-1.15-.775-1.925-.775-.775-1.925-.775-1.1 0-1.9.775-.8.775-.8 1.925 0 1.1.8 1.9.8.8 1.9.8Zm7.3 13.6q3.3 0 6.075-1.775Q32.85 31.4 34.1 28.35H13.9q1.3 3.05 4.05 4.825Q20.7 34.95 24 34.95Z"/></svg>
              </div>
              <h3 class="h5">{{ $t('enjoy_sport') }}</h3>
              <p class="text-muted">{{ $t('enjoy_sport_description') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-6 bg-gray-100"> 
      <div class="container">
        <div class="row mb-5">
          <div class="col-md-8">
            <h2>{{ $t('lasts_sport_centers') }}</h2>
          </div>
          <div class="col-md-4 d-lg-flex align-items-center justify-content-end"><router-link class="text-muted text-sm" :to="{name: 'site-search'}">
               {{ $t('see_all_centers') }}<i class="fas fa-angle-double-right ms-2"></i></router-link></div>
        </div>
        <!-- Slider main container-->
        <div class="swiper-container swiper-container-mx-negative swiper-init pt-3">
          <swiper
            class="swiper-wrapper pb-5"
            :pagination="{ clickable: true, dynamicBullets: true }"
            :slides-per-view="1"
            :space-between="15"
            :breakpoints="{
              '1200': {
                slidesPerView: 4
              },
              '992': {
                slidesPerView: 3
              },
              '566': {
                slidesPerView: 2
              }
            }"
          >
            <swiper-slide v-for="(item, index) in lasts" :key="index">
              <div class="swiper-slide h-auto px-2">
              <!-- place item-->
              <div class="w-100 h-100 hover-animate">
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
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </section>
</template>

<script>
export default {
  props: ['cities', 'categories', 'lasts'],
  data(){
    return {
      data: {},
      s_cities: [],
      s_districts: [],
      s_categories: []
    }
  },
  methods: {
    search(){
      if(!this.data.city || !this.data.district || !this.data.category) return;
      this.$router.push({name: 'site-search', query: this.data})
    },
    load(){
      this.s_cities = []
      this.s_districts = []
      this.s_categories = []
      if(this.categories.length){
        this.categories.forEach(element => {
          this.s_categories.push({
            id: (element.title),
            text: element.title
          })
        });
      }
      if(this.cities.length){
        this.cities.forEach(element => {
          this.s_cities.push({
            id: (element.title),
            text: element.title
          })
        });
      }
      if(this.data.city && this.cities){
        const a = this.cities.filter((a) => {
          return a.title == this.data.city
        })[0]
        this.s_districts = a ? a.district : []
      }
      this.data.city = 'İstanbul'
    }
  },
  mounted(){
    this.load()
  },
  watch: {
    'categories'(){
      this.load()
    },
    'cities'(){
      this.load()
    },
    'data.city'(){
      this.load()
    }
  }
}
</script>

<style>
.select2-container--default .select2-selection--single {
  border: 0px !important
}
</style>