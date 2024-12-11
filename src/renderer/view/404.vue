<script setup>
import { ref } from 'vue'

const hello = ref('来写')
</script>

<template>
    <div class="container">
        <div class="info-box">
            <h1>404 Not Found</h1>
            <h2>来到了一片荒野~~</h2>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    background-color: #F6F6F7;
    padding: 20px;
    box-sizing: border-box;
    color: black;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    .info-box {

        h1,
        h2 {
            width: 100%;
            margin: 20px 0;
        }
    }

}
</style>