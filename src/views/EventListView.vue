<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard
      v-for="event in events"
      :key="event.id"
      :event="event"
    ></EventCard>

    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
      >
        Prev Page
      </router-link>

      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
      >
        Next Page
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
import { watchEffect } from '@vue/runtime-core'
// import NProgress from 'nprogress'

export default {
  name: 'EventListView',
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    // NProgress.start()
    EventService.getEvents(3, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        next((comp) => {
          comp.events = response.data
          comp.totalEvents = response.headers['x-total-count']
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
    // .finally(() => {
    //   NProgress.done()
    // })
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    // NProgress.start()
    EventService.getEvents(3, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        next((comp) => {
          comp.events = response.data
          comp.totalEvents = response.headers['x-total-count']
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
    // .finally(() => {
    //   NProgress.done()
    // })
  },

  components: {
    EventCard
  },
  data() {
    return {
      events: null,
      totalEvents: 0
    }
  },
  created() {
    watchEffect(() => {
      EventService.getEvents(2, this.page)
        .then((response) => {
          this.events = response.data
          this.totalEvents = response.headers['x-total-count']
        })
        .catch((error) => {
          console.log(error)
        })
    })
  },
  computed: {
    hasNextPage() {
      let totalPages = Math.ceil(this.totalEvents / 3)
      return this.page < totalPages
    }
  }
}
</script>
<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
