<template>
  <div class="notFoundPage">
    <el-col :sm="24" :lg="12">
      <el-result
        icon="warning"
        title="报错了"
        subTitle="页面根本就找不到，路由错误了，大哥返回首页吧"
      >
        <template slot="extra">
          <el-button type="primary" size="medium" @click="backHome"
            >home</el-button
          >
        </template>
      </el-result>
    </el-col>
  </div>
</template>

<script>
export default {
  methods: {
    backHome: function() {
      this.$router.replace("/");
    },
  },
};
</script>

<style lang="scss"></style>
