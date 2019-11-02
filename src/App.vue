<template>
    <div id="app">
        <div class="container">
            <div class="row header">
                <div class="record">Name</div>
                <div class="record">Height</div>
                <div class="record">Mass</div>
                <div class="record">Hair color</div>
                <div class="record">Skin color</div>
                <div class="record">Eye color</div>
                <div class="record">Birth year</div>
                <div class="record">Gender</div>
            </div>
            <div class="row header">
                <SearchInput
                        :list="list"
                        :field="'name'"
                        @onSearch="onSearch"
                />
                <SearchInput
                        :list="list"
                        :field="'height'"
                        @onSearch="onSearch"
                />
                <SearchInput
                        :list="list"
                        :field="'mass'"
                        @onSearch="onSearch"
                />
                <SearchInput
                        :list="list"
                        :field="'hair_color'"
                        @onSearch="onSearch"
                />
                <SearchInput
                        :list="list"
                        :field="'skin_color'"
                        @onSearch="onSearch"
                />
                <SearchInput
                        :list="list"
                        :field="'eye_color'"
                        @onSearch="onSearch"
                />
                <SearchInput
                        :list="list"
                        :field="'birth_year'"
                        @onSearch="onSearch"
                />
                <SearchInput
                        :list="list"
                        :field="'gender'"
                        @onSearch="onSearch"
                />
            </div>
            <div class="row header">
                <div class="record" @click="onSort('name')"><i class="material-icons">sort</i></div>
                <div class="record" @click="onSort('height')"><i class="material-icons">sort</i></div>
                <div class="record" @click="onSort('mass')"><i class="material-icons">sort</i></div>
                <div class="record" @click="onSort('hair_color')"><i class="material-icons">sort</i></div>
                <div class="record" @click="onSort('skin_color')"><i class="material-icons">sort</i></div>
                <div class="record" @click="onSort('eye_color')"><i class="material-icons">sort</i></div>
                <div class="record" @click="onSort('birth_year')"><i class="material-icons">sort</i></div>
                <div class="record" @click="onSort('gender')"><i class="material-icons">sort</i></div>
            </div>
            <ListItem v-for="hero of searchedList"
                      :hero="hero"
                      :key="hero.id"
                      @onDelete="onDelete(hero.name)"
                      @onSave="onSave"
            />
        </div>
    </div>
</template>

<script>
import ListItem from './components/ListItem.vue'
import heroList from "@/assets/heroList.ts";
import SearchInput from "@/components/SearchInput";


export default {
  name: 'app',
  components: {
    SearchInput,
    ListItem
  },
    mounted(){
      if (localStorage.getItem('heroList')){
          this.list = JSON.parse(localStorage.getItem('heroList'));
      } else {
          const list = heroList.map(hero => ({...hero, id: `f${(~~(Math.random()*1e8)).toString(16)}`, edited: false}));
          localStorage.setItem('heroList', JSON.stringify(list));
          this.list = list;
      }
    },
    computed: {
      searchedList() {
          return this.searched.length > 0 ? this.searched : this.list;
      }
    },
    methods:{
      onDelete(name) {
          this.list = this.list.filter(hero => hero.name !== name);
          localStorage.setItem('heroList', JSON.stringify(this.list));
      },

      onSave(userObj) {
          const heroIndex = this.list.findIndex(hero => hero.id === userObj.id);
          this.list.splice(heroIndex, 1, userObj);
          localStorage.setItem('heroList', JSON.stringify(this.list));
        },

      onSort(key) {
          this.searchedList.sort((a, b) => {
              let result = 0;
              if (!isNaN(parseFloat(a[key])) && !isNaN(parseFloat(a[key])) &&
                  typeof parseFloat(a[key]) === 'number' && typeof parseFloat(b[key]) === 'number'){
                  result = parseFloat(a[key]) - parseFloat(b[key]);
              } else {
                  result = a[key] > b[key] ? 1 : -1;
              }
              return result;
          })
      },

      onSearch(list){
          this.searched = list;
      }
    },
  data: function() {
    return {
      list: heroList,
      searched: [],
    }
  },
}
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    .container {
        max-width: 1600px;
        margin: auto;
    }
    .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 20px;
        margin-bottom: 10px;
    }
    .record {
        width: 180px;
        text-align: center;
        box-sizing: border-box;
    }
    .header {
        width: 1440px;
        font-weight: 600;
        margin-bottom: 20px;
    }
    .material-icons{
        cursor: pointer;
    }
</style>
