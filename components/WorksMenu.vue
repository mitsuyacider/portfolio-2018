<template>
  <div role="tablist">
    <category-card :works="works['web']" :accordionId="'accordion1'" :title="'Web Applications'" />
    <category-card :works="works['mobile']" :accordionId="'accordion2'" :title="'Mobile Applications'" />
    <category-card :works="works['r_d']" :accordionId="'accordion3'" :title="'R&D'" />

  </div>    
</template>

<script>
import data from '@/assets/data/data.json'
import CategoryCard from '@/components/CategoryCard'

export default {
  data () {
    return {      
      works: data,
    }
  },
  components: {
    CategoryCard    
  }
}
</script>