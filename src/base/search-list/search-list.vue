
<style scoped lang="scss">
@import "../../common/scss/variable";
@import "../../common/scss/mixin";
.search-list {
  .search-item {
    display: flex;
    align-items: center;
    height: 35px;
    overflow: hidden;
    font-size: 14px;
    &.list-enter-active, &.list-leave-active {
      transition: all 0.1s;
    }
    &.list-enter, &.list-leave-to {
      height: 0;
    }
    .text {
      flex: 1;
      color: $color-text;
    }
    .icon {
      @include extend-click();
      .icon-delete {
        font-size: $font-size-small;
        color: $color-text;
      }
    }
  }
}
</style>