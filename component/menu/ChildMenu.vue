<template>
  <template
    v-for="menu in menuList"
    :key="menu.id"
  >
    <template v-if="!menu.isDisabled">
      <el-sub-menu
        v-if="menu.children && menu.children.length > 0"
        :id="menu.id"
        :index="menu.id + ''"
      >
        <template #title>
          <i
            class="iconfont menu-icon"
            :class="menu.icon"
          />
          <span>{{ menu.name }}</span>
        </template>
        <ChildMenu :menu-list="menu.children" />
      </el-sub-menu>
      <el-menu-item
        v-else
        :id="menu.id"
        :index="menu.path"
      >
        <template #title>
          <i
            class="iconfont menu-icon"
            :class="menu.icon"
          />
          <span>
            {{ menu.name }}
          </span>
        </template>
      </el-menu-item>
    </template>
  </template>
</template>

<script lang="ts" setup>
import { IMenu } from '../../interface/IMenu'

defineProps({
  /**
   * # 菜单列表
   * ---
   * 💡 请确保传入的数组类型为 ```IMenu``` 的实现类
   */
  menuList: {
    type: Array<IMenu>,
    required: true,
  },
})
</script>
<style lang="scss" scoped>
.menu-icon {
  margin-right: 5px;
}
</style>
