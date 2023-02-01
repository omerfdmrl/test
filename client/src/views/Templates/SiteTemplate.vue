<template>
    <header class="header">
      <!-- Navbar-->
      <nav class="navbar navbar-expand-lg fixed-top shadow navbar-light bg-white">
        <div class="container-fluid">
          <div class="d-flex align-items-center"><router-link class="navbar-brand py-1" :to="{name: 'site-home'}"><h2 v-if="$store.state.informations.logo.type == 'text'">{{ $store.state.informations.logo.value }}</h2><img v-if="$store.state.informations.logo.type == 'image'" :src="$store.state.informations.logo.value" alt="Directory logo"></router-link>
          </div>
          <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation"><i class="fa fa-bars"></i></button>
          <!-- Navbar Collapse -->
          <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav ms-auto">
              <li :class="[item.child ? 'dropdown' : null,'nav-item']" v-for="(item,index) in header" :key="index">
                <a v-if="item.href.type == 'url' && !item.child && !item.href.value.startsWith('/')" class="nav-link" :href="item.href.value" :target="item.href.target">{{ item.title }}</a>
                <router-link v-if="item.href.type == 'url' && !item.child && item.href.value.startsWith('/')" class="nav-link" :to="item.href.value" :target="item.href.target">{{ item.title }}</router-link>
                <router-link v-if="item.href.type == 'router' && !item.child" class="nav-link" :to="{name: item.href.value, params: JSON.parse(item.href.params)}">{{ item.title }}</router-link>
                <a v-if="item.child" class="nav-link dropdown-toggle" href="#!" :id="`heder-dropdown-${index}`" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ item.title }}</a>
                <div class="dropdown-menu dropdown-menu-end" :aria-labelledby="`heder-dropdown-${index}`">
                  <li v-for="(item2,index2) in item.child" :key="index2">
                    <a v-if="item2.href.type == 'url'" class="dropdown-item" :href="item2.href.value" :target="item2.href.target">{{ item2.title }}</a>
                    <router-link v-if="item2.href.type == 'router'" class="dropdown-item" :to="{name: item2.href.value, params: item2.href.params}">{{ item2.title }}</router-link>
                  </li>
                </div>
              </li>
              <li class="nav-item mt-3 mt-lg-0 ms-lg-3 d-lg-none d-xl-inline-block">
                <a v-if="!$store.state.user" :href="$router.resolve({name: 'panel-login'}).href" class="btn btn-primary">{{ $t('login') }}</a>
                <a v-else :href="$router.resolve({name: 'panel-dashboard'}).href" class="btn btn-primary">{{ $t('go_to_panel') }}</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <!-- /Navbar -->
    </header>
    <router-view :categories="categories" :cities="cities" :lasts="lasts"></router-view>
    <!-- Footer-->
    <footer class="position-relative z-index-10 d-print-none">
      <!-- Copyright section of the footer-->
      <div class="py-4 fw-light bg-gray-800 text-gray-300">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6 text-center text-md-start">
              <p v-if="$store.state.informations" class="text-sm mb-md-0">{{ $t('footer_0_0_all_rights_reserved', { name: $store.state.informations.name, date: new Date().getFullYear() }) }}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
</template>

<script>
import siteService from "@/services/site.service";
export default {
  props: ["menu", "tags"],
  data() {
    return {
      header: [],
      footer: [],
      cities: [],
      categories: [],
      lasts: []
    };
  },
  methods: {
    updateHead(informations) {
      this.$emit("updateHead", informations);
    },
    async search() {
      const response = await siteService.search(this.searchData);
      if (response.status == 1) {
        this.searchData.posts = response.posts;
      }
    },
  },
  async created(){
    const response = await siteService.home()
    if (response.status == 1) {
        this.cities = response.cities
        this.categories = response.categories
        this.lasts = response.lasts
      }
  },  
  watch: {
    menu() {
      const menu = structuredClone(this.menu);
      if (menu) {
        var parents = menu.filter((el) => {
          return !el.parent;
        });
        var child = menu.filter((el) => {
          return el.parent;
        });
        child.forEach((element) => {
          var parent = parents.filter((el) => {
            return el._id == element.parent._id;
          });
          if (!parents[parents.indexOf(parent[0])].child) {
            parents[parents.indexOf(parent[0])].child = [];
          }
          parents[parents.indexOf(parent[0])].child.push(element);
        });
        this.header = parents.filter((el) => {
          return el.menu == "header";
        });
        this.footer = parents.filter((el) => {
          return el.menu == "footer";
        });
      }
    }
  },
};
</script>