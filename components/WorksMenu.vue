<template>
  <div role="tablist">
    <category-card 
      :works="works['web']" 
      :accordionId="'accordion1'" 
      :title="'Web Applications'" 
      v-on:tappedWork="onTapWork" />
    <category-card 
      :works="works['mobile']" 
      :accordionId="'accordion2'" 
      :title="'Mobile Applications'"
      v-on:tappedWork="onTapWork" />
    <category-card 
    :works="works['r_d']" 
    :accordionId="'accordion3'" 
    :title="'R&D'"
    v-on:tappedWork="onTapWork" />

  </div>    
</template>

<script>
import data from '@/assets/data/data.json'
import CategoryCard from '@/components/CategoryCard'
import { mapActions } from 'vuex'

export default {
  data () {
    return {      
      works: data,
    }
  },
  components: {
    CategoryCard    
  },
  methods: {
    onTapWork (work) {
      this.setSelectedWork(work)
      this.$emit('tappedWork', work)
    },
    ...mapActions([
      'setSelectedWork'
    ])

  }
}
</script>