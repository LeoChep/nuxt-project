<template>
    <el-container>
        <el-header>
            <el-row :gutter="20">
                <el-col :span="6" >
               <input class="name"/>
                </el-col>
                <el-col :span="6" :offset="6">
                    <div class="grid-content ep-bg-purple" />
                </el-col>
            </el-row>
        </el-header>
        <el-aside></el-aside>
        <el-main>
            <CharacterTabsGeneral></CharacterTabsGeneral>
        </el-main>
    </el-container>
</template>
<script setup>
const form = reactive({
    name: '',
    level: '',
    region: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
})
</script>
<style >
.name{
    background-color: transparent;
    height: 100%;
    color: wheat;
    outline:none;
    border: none;
}

</style>