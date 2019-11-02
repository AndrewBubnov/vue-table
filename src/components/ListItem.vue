<template>
    <div class="row">
      <div class="record" :key="name" v-for="(value, name) in userObj">{{ value }}</div>
      <button @click="onDelete">Delete</button>
    </div>
</template>
<script>
export default {
  name: 'ListItem',
  props: {
    hero: Object
  },
  data: function () {
    return{
      userObj: this.hero
    }
  },
  methods: {
    onDelete(){
      this.$emit('onDelete')
    }
  },
}
</script>


<style scoped>

</style>
