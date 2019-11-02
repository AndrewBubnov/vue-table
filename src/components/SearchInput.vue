<template>
    <input class="record" type="text" @input="onInput">
</template>
<script>

export default {
  name: 'SearchInput',
    props: ['list', 'field'],
  data: function () {
    return {

    }
  },
  methods: {
      onInput(e){
          const searchedList = this.list.filter(item => item[this.field].includes(e.target.value));
          this.$emit('onSearch', searchedList);
      }
  },
}
</script>


<style scoped>

</style>
