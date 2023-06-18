<template>
    <div class="character-card">
    <el-row>
      <el-col :span="4">
        <div class="row">
          <label>头像:</label>
          <input type="text" v-model="avatar">
        </div>
      </el-col>
      <el-col :span="4">
        <div class="row">
          <label>族裔:</label>
          <input type="text" v-model="ethnicity">
        </div>
      </el-col>
      <el-col :span="4">
        <div class="row">
          <label>传承:</label>
          <input type="text" v-model="heritage">
        </div>
      </el-col>
      <el-col :span="4">
        <div class="row">
          <label>背景:</label>
          <input type="text" v-model="background">
        </div>
      </el-col>
      <el-col :span="4">
        <div class="row">
          <label>性别:</label>
          <input type="text" v-model="gender">
        </div>
      </el-col>
      <el-col :span="4">
        <div class="row">
          <label>年龄:</label>
          <input type="number" v-model="age">
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="4">
        <div class="row">
          <label>身高:</label>
          <input type="number" v-model="height">
        </div>
      </el-col>
      <el-col :span="4">
        <div class="row">
          <label>体重:</label>
          <input type="number" v-model="weight">
        </div>
      </el-col>
      <el-col :span="4">
        <div class="row">
          <label>种族划分:</label>
          <input type="text" v-model="race">
        </div>
      </el-col>
      <el-col :span="4">
        <div class="row">
          <label>所属地:</label>
          <input type="text" v-model="location">
        </div>
      </el-col>
      <el-col :span="4">
        <div class="row">
          <label>速度:</label>
          <input type="number" v-model="speed">
        </div>
      </el-col>
      <el-col :span="4">
        <div class="row">
          <label>体型:</label>
          <input type="text" v-model="bodyType">
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="4">
        <div class="row">
          <label>剩余负载:</label>
          <input type="number" v-model="remainingLoad">
        </div>
      </el-col>
      <el-col :span="4">
        <div class="row">
          <label>负载限重:</label>
          <input type="number" v-model="loadLimit">
        </div>
      </el-col>
      <el-col :span="4">
        <div class="row">
          <label>信仰:</label>
          <input type="text" v-model="faith">
        </div>
      </el-col>
      <el-col :span="4">
        <div class="row">
          <label>阵营:</label>
          <input type="text" v-model="alignment">
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script >
//灰色的框
//亮色的字

</script>
<style>
/* Text Input */
input[type="text"],
input[type="number"],
input[type="password"],
input[type="date"],
input[type="time"],
input[type="search"] {
  width: calc(100% - 2px);
  min-width: 20px;
  height: var(--form-field-height);
  background: rgba(0, 0, 0, 0.05);
  padding: 1px 3px;
  margin: 0;
  color: var(--color-text-dark-primary);
  font-family: inherit;
  font-size: inherit;
  text-align: inherit;
  line-height: inherit;
  border: 1px solid var(--color-border-light-tertiary);
  border-radius: 3px;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
}
input[type="text"]:focus,
input[type="number"]:focus,
input[type="password"]:focus,
input[type="date"]:focus,
input[type="time"]:focus,
input[type="search"]:focus {
  box-shadow: 0 0 5px var(--color-shadow-primary);
}
.character-card {
  margin: 20px;
}

label {
  display: inline-block;
  width: 100px;
  font-weight: bold;
}
</style>