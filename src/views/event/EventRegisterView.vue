<template>
  <p>Registration form here</p>
  <button @click="register">Register Me</button>
</template>

<script>
export default {
  props: ['id', 'event'],
  inject: ['GStore'],
  methods: {
    register() {
      this.$router.push({
        name: 'EventDetails',
        params: { id: this.event.id }
      })
      this.GStore.flashMessage =
        'You are successfully registered for ' + this.event.title
      setTimeout(() => {
        this.GStore.flashMessage = ''
      }, 3000)
    }
  }
}
</script>
