<template lang="html">
    <div>
        <input :id="category+index" class="checkbox" type="checkbox" :value="name">
        <label class="tag" @click="setCheckboxOnLabelClick(category+index)">
            <span>{{ name }}</span>
        </label>
    </div>

</template>

<script>
export default {
    name: 'Tag',
    props: {
        name: '',
        category: '',
        index: ''
    },
    methods: {
        setCheckboxOnLabelClick: function(id) {
            const el = document.getElementById(id)
            el.click()
        }
    },
    mounted() {
    }
}
</script>

<style scoped>

.tag {
    cursor: pointer;
    display: flex;
    background: #dedede;
    padding: 7px 14px;
    text-align: center;
    width: 100%;
    border-radius: 5px;
}

.checkbox{
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
}

.checkbox:checked + label {
    background: #4b2c50;
    color: #fff;
}


</style>
