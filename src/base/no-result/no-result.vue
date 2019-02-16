<template>
    <div class="no-result">
        <div class="no-result-icon"><i class="fa fa-music"></i></div>
        <p class="no-result-text">{{title}}</p>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '暂无相关数据'
        }
    }
}
</script>

<style scoped lang="scss" >
  @import "../../common/scss/variable";
  @import "../../common/scss/mixin";

.no-result {
  text-align: center;
  .no-result-icon {
    color: $color-text-gg;
    font-size: 50px;
  }
  .no-result-text {
    margin-top: 30px;
    font-size: $font-size-medium;
    color: $color-text;
  }
}
</style>