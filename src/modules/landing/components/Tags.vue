<template lang="html">
    <div>
        <label class="tag">
            <span>{{ name }}</span>
            <input type="checkbox" :value="name">
        </label>
    </div>

</template>

<script>
export default {
    name: 'Tags',
    props:{
        name: ''
    }
}
</script>

<style scoped>
</style>
