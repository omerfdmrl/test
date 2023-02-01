<template>
    <section class="hero py-6 py-lg-7 text-white dark-overlay">
      <div class="container overlay-content">
        <h1 class="hero-heading">{{ data.title }}</h1>
      </div>
    </section>
    <section class="py-6">
      <div class="container" v-html="data.content">
      </div>
    </section>
</template>

<script>
import SiteService from '@/services/site.service'
export default {
    data() {
        return {
            data: {}
        }
    },
    async created() {
        const response = await SiteService.pageIndex(this.$route.params)
        this.data = response.page
    }
}
</script>