<template>
    <section>
      <!-- Slider main container-->
      <div class="swiper-container detail-slider slider-gallery swiper-container-horizontal">
        <!-- Additional required wrapper-->
        <swiper
          class="swiper-wrapper"
          :pagination="{ clickable: true, dynamicBullets: true }"
          :slides-per-view="3"
        >
        <swiper-slide v-for="(image, index) in data.images" :key="index" class="swiper-slide">
          <a href="#!" data-toggle="gallery-top" :title="data.title">
            <img class="img-fluid" :src="image" :alt="data.title">
          </a>
        </swiper-slide>
      </swiper>
      </div>
    </section>
    <div class="container py-5">
      <div class="row">
        <div class="col-lg-8"> 
          <div v-if="data.title" class="text-block">
            <p class="text-primary"><i class="fa-map-marker-alt fa me-1"></i> {{ data.location.district }}, {{ data.location.city.title }}</p>
            <h1>{{ data.title }}</h1>
            <p v-html="data.content"></p>
          </div>
          <div v-if="data.title" class="text-block">
            <h4 class="mb-0">{{ $t('tags') }}</h4>
            <ul class="list-inline">
              <li v-for="(tag, index) in data.tag[0].split(',')" :key="index" class="list-inline-item mb-2"><span class="badge rounded-pill bg-light p-3 text-muted fw-normal">{{ tag }}</span></li>
            </ul>
          </div>
          <!-- <div v-if="data.title" class="text-block">
            <div class="d-flex"><img class="avatar avatar-lg p-1 flex-shrink-0 me-4" :src="data.user.image" alt="Jack London">
              <div>
                <p> <span class="text-muted text-uppercase text-sm">{{ $t('hosted_by') }} </span><br><strong>{{ data.user.name.first + ' ' + data.user.name.last }}</strong></p>
                <p class="text-muted text-sm" v-html="data.user.about"></p>
              </div>
            </div>
          </div> -->
          <div class="text-block">
            <h5 class="mb-4">{{ $t('listing_location') }}</h5>
            <div class="map-wrapper-300 mb-3">
              <div class="h-100" id="detailMap"></div>
            </div>
          </div>
          <div v-if="data.title" class="text-block">
            <h5 class="mb-4">{{ $t('gallery') }}</h5>
            <div class="row gallery mb-3 ms-n1 me-n1">
              <div v-for="(image, index) in data.images" :key="index" class="col-lg-4 col-6 px-1 mb-2">
                <a href="#!" data-fancybox="gallery" :title="data.title">
                  <img class="img-fluid" :src="image" :alt="data.title">
                </a>
              </div>
            </div>
          </div>
          <div v-if="data.title" class="text-block">
            <p class="subtitle text-sm text-primary">{{ $t('reviews') }}</p>
            <div v-for="(review, index) in reviews" :key="index" class="d-flex d-block d-sm-flex review">
              <div>
                <h6 class="mt-2 mb-1">{{ review.name }}</h6>
                <div class="mb-2">
                  <i v-for="(star, index2) in review.rating" :key="index2" class="fa fa-xs fa-star text-primary"></i>
                </div>
                <p class="text-muted text-sm" v-html="review.content"></p>
              </div>
            </div>
            <div class="py-5">
              <button class="btn btn-outline-primary" type="button" data-bs-toggle="collapse" data-bs-target="#leaveReview" aria-expanded="false" aria-controls="leaveReview">{{ $t('leave_a_review') }}</button>
              <div class="collapse mt-4" id="leaveReview">
                <h5 class="mb-4">{{ $t('leave_a_review') }}</h5>
                <form class="form" id="contact-form" method="get" @submit.prevent="postReview" action="#">
                  <div class="row">
                    <div class="col-sm-6" v-if="!$store.state.user">
                      <div class="mb-4">
                        <label class="form-label" for="name">{{ $t('your_name') }} *</label>
                        <input v-model="review.name" class="form-control" type="text" name="name" id="name" :placeholder="$t('your_name')" required>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="mb-4">
                        <label class="form-label" for="rating">{{ $t('your_rating') }} *</label>
                        <select v-model="review.rating" class="form-select focus-shadow-0" name="rating" id="rating">
                          <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733; (5/5)</option>
                          <option value="4">&#9733;&#9733;&#9733;&#9733;&#9734; (4/5)</option>
                          <option value="3">&#9733;&#9733;&#9733;&#9734;&#9734; (3/5)</option>
                          <option value="2">&#9733;&#9733;&#9734;&#9734;&#9734; (2/5)</option>
                          <option value="1">&#9733;&#9734;&#9734;&#9734;&#9734; (1/5)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="mb-4" v-if="!$store.state.user">
                    <label class="form-label" for="email">{{ $t('your_email') }} *</label>
                    <input v-model="review.email" class="form-control" type="email" name="email" id="email" :placeholder="$t('your_email')" required>
                  </div>
                  <div class="mb-4">
                    <label class="form-label" for="review">{{ $t('review_note') }} *</label>
                    <textarea v-model="review.content" class="form-control" rows="4" name="review" id="review" :placeholder="$t('review_note')" required></textarea>
                  </div>
                  <button class="btn btn-primary" type="submit">{{ $t('post_review') }}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card border-0 shadow mb-5 p-4 shadow ms-lg-4 rounded">
            <div class="card-header bg-gray-100 py-4 border-0">
              <div class="d-flex align-items-center justify-content-between">
                <div>
                  <h4 class="mb-0">{{ $t('opening_hours') }}</h4>
                </div>
                  <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m31.35 33.65 2.25-2.25-7.95-8V13.35h-3V24.6ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24t1.575-7.75q1.575-3.65 4.3-6.375 2.725-2.725 6.375-4.3Q19.9 4 24 4t7.75 1.575q3.65 1.575 6.375 4.3 2.725 2.725 4.3 6.375Q44 19.9 44 24t-1.575 7.75q-1.575 3.65-4.3 6.375-2.725 2.725-6.375 4.3Q28.1 44 24 44Zm0-20Zm0 17q7 0 12-5t5-12q0-7-5-12T24 7q-7 0-12 5T7 24q0 7 5 12t12 5Z"/></svg>
              </div>
            </div>
            <div class="card-body" v-if="data.time">
              <table class="table text-sm mb-0">
                <tbody><tr>
                  <th class="ps-0 border-0">{{ $t('monday') }}</th>
                  <td class="pe-0 text-end border-0">{{ data.time.monday.opening + ' - ' + data.time.monday.closing  }}</td>
                </tr>
                <tr>
                  <th class="ps-0">{{ $t('tuesday') }}</th>
                  <td class="pe-0 text-end">{{ data.time.tuesday.opening + ' - ' + data.time.tuesday.closing  }}</td>
                </tr>
                <tr>
                  <th class="ps-0">{{ $t('wednesday') }}</th>
                  <td class="pe-0 text-end">{{ data.time.wednesday.opening + ' - ' + data.time.wednesday.closing  }}</td>
                </tr>
                <tr>
                  <th class="ps-0">{{ $t('thursday') }}</th>
                  <td class="pe-0 text-end">{{ data.time.thursday.opening + ' - ' + data.time.thursday.closing  }}</td>
                </tr>
                <tr>
                  <th class="ps-0">{{ $t('friday') }}</th>
                  <td class="pe-0 text-end">{{ data.time.friday.opening + ' - ' + data.time.friday.closing  }}</td>
                </tr>
                <tr>
                  <th class="ps-0">{{ $t('saturday') }}</th>
                  <td class="pe-0 text-end">{{ data.time.saturday.opening + ' - ' + data.time.saturday.closing  }}</td>
                </tr>
                <tr>
                  <th class="ps-0">{{ $t('sunday') }}</th>
                  <td class="pe-0 text-end">{{ data.time.sunday.opening + ' - ' + data.time.sunday.closing  }}</td>
                </tr>
              </tbody></table>
            </div>
          </div>
          <div class="p-4 shadow ms-lg-4 rounded sticky-top" style="top: 100px;">
            <span class="text-muted">{{ $t('get_contact') }}</span><span class="h4 text-primary float-end">25 ₺</span>
            <hr class="my-4">
            <form class="form" id="booking-form" method="get" action="#" autocomplete="off">
              <div v-if="data.contact" class="mb-4 book-socials">
                <a v-if="data.contact.instagram" target="_blank" :href="`https://instagram.com/${data.contact.instagram}`"><i class="fab fa-instagram"></i></a>
                <a v-if="data.contact.twitter" target="_blank" :href="`https://twitter.com/${data.contact.twitter}`"><i class="fab fa-twitter"></i></a>
                <a v-if="data.contact.tel_no" target="_blank" :href="`tel:${data.contact.tel_no}`"><i class="fa fa-phone"></i></a>
                <a v-if="data.contact.mail" target="_blank" :href="`mailto:${data.contact.mail}`"><i class="fa fa-envelope"></i></a>
              </div>
              <div v-if="this.data.location" class="d-grid mb-4">
                <a class="btn btn-primary" target="_blank" :href="`https://maps.google.com/?q=${data.location.latitude},${data.location.longitude}`">{{ $t('view_on_map') }}</a>
              </div>
            </form>
            <hr class="my-4">
            <div class="text-center">
              <p v-if="$store.state.user"> <a @click="handleBookmark" class="text-secondary text-sm" href="#!">
                <i class="fa fa-heart"> </i>  
                 <span v-if="!bookmark"> {{ $t('bookmark_this_listing') }}</span>
                 <span v-else> {{ $t('delete_bookmark_this_listing') }}</span>
              </a></p>
              <p class="text-muted text-sm">{{ $t('0_people_bookmarked_this_place', { count: bookmarks }) }} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
  import siteService from '@/services/site.service'
  import "leaflet/dist/leaflet.css";
  import L from "leaflet";
  export default {
    data(){
      return {
        data: {},
        review: {},
        bookmarks: 0,
        bookmark: 0,
        reviews: [],
      }
    },
    methods: {
      async handleBookmark(){
        if(this.bookmark){
          this.bookmark = 0
          this.bookmarks--
        }else {
          this.bookmark = 1
          this.bookmarks++
        }
        siteService.bookmark(this.$route.params)
      },
      async postReview(){
        this.review.slug = this.$route.params.slug
        const response = await siteService.postReview(this.review)
        if(response.status == 1){
          this.reviews.unshift(this.review)
          this.review = {}
        }
      }
    },
    async created(){
      const response = await siteService.businessIndex(this.$route.params)
      if(response.status == 1){
        this.data = response.business
        this.reviews = response.reviews
        this.bookmark = response.bookmark
        this.bookmarks = response.bookmarks
        var greenIcon = L.icon({
          iconUrl: 'https://unpkg.com/leaflet@1.9.2/dist/images/marker-icon.png',

          popupAnchor:  [10, 10] // point from which the popup should open relative to the iconAnchor
        });
        var map = L.map('detailMap').setView([this.data.location.latitude, this.data.location.longitude], 13)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://github.com/omerfdmrl">Omerfdmrl</a>'
        }).addTo(map);
        
        L.marker([this.data.location.latitude, this.data.location.longitude], {icon: greenIcon}).addTo(map)
        .bindPopup(this.data.title)
        .openPopup();
      }
    }
  }
  </script>

  <style scoped>
  .book-socials {
    display: flex;
    justify-content: space-evenly;
  }
  .book-socials i {
    font-size: 20px;
  }
  </style>