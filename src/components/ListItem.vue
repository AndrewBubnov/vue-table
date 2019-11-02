<template>
    <div class="row">
        <input type="text" class="record-input" v-model="userObj.name" v-if="userObj.edited">
        <div class="record" v-else>{{ userObj.name }}</div>
        <input type="text" class="record-input" v-model="userObj.height" v-if="userObj.edited">
        <div class="record" v-else>{{ userObj.height }}</div>
        <input type="text" class="record-input" v-model="userObj.mass" v-if="userObj.edited">
        <div class="record" v-else>{{ userObj.mass }}</div>
        <input type="text" class="record-input" v-model="userObj.hair_color" v-if="userObj.edited">
        <div class="record" v-else>{{ userObj.hair_color }}</div>
        <input type="text" class="record-input" v-model="userObj.skin_color" v-if="userObj.edited">
        <div class="record" v-else>{{ userObj.skin_color }}</div>
        <input type="text" class="record-input" v-model="userObj.eye_color" v-if="userObj.edited">
        <div class="record" v-else>{{ userObj.eye_color }}</div>
        <input type="text" class="record-input" v-model="userObj.birth_year" v-if="userObj.edited">
        <div class="record" v-else>{{ userObj.birth_year }}</div>
        <input type="text" class="record-input" v-model="userObj.gender" v-if="userObj.edited">
        <div class="record" v-else>{{ userObj.gender }}</div>
        <div class="button-container">
            <button @click="onEditSave">{{label}}</button>
            <button @click="onDelete">Delete</button>
        </div>
    </div>
</template>
<script>

export default {
  name: 'ListItem',
    props: {
    hero: Object
  },
  data: function () {
    return {
        userObj: this.hero,
        label: 'Edit',
    }
  },
  methods: {
    onDelete(){
      this.$emit('onDelete')
    },
    onEditSave(){
      this.userObj.edited = !this.userObj.edited;
      if (this.label === 'Edit') {
          this.label = 'Save';
      } else {
          this.label = 'Edit';
          this.$emit('onSave', this.userObj)
      }
    },
  },
}
</script>


<style scoped>
button{
    width: 55px;
    height: 24px;
}
.button-container{
    display: flex;
    justify-content: space-between;
    width: 120px;
}
.record-input {
    height: 20px;
    padding: 0;
    font-size: 1rem;
    width: 176px;
    text-align: center;
}
</style>
