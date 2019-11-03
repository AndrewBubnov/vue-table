<template>
    <div class="row">
        <div v-if="userObj.edited">
            <input class="record-input" v-for="field in iteratedFields"
                   :key="field"
                   v-model="userObj[field]"
            />
        </div>
        <div class="record" v-else
             v-for="field in iteratedFields"
             :key="field"
        >{{userObj[field]}}
        </div>
        <div class="button-container">
            <div @click="onEditSave"><i class="material-icons">{{label}}</i></div>
            <div @click="onDelete"><i class="material-icons">delete</i></div>
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
        label: 'edit',
    }
  },
  computed: {
      iteratedFields() {
          return Object.keys(this.userObj).filter(field => field !== 'id' && field !== 'edited');
      },
  },
  methods: {
    onDelete(){
      this.$emit('onDelete')
    },
    onEditSave(){
      this.userObj.edited = !this.userObj.edited;
      if (this.label === 'edit') {
          this.label = 'done';
      } else {
          this.label = 'edit';
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
    width: 70px;
    margin-left: 30px;
}
.record-input {
    height: 20px;
    padding: 0;
    font-size: 1rem;
    width: 176px;
    text-align: center;
}
</style>
