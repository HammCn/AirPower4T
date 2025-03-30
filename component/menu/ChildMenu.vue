<script lang="ts" setup>
import type { IMenu } from '../../interface/IMenu'
import { ElMenuItem, ElSubMenu } from 'element-plus'

defineProps({
  /**
   * # 菜单列表
   * 请确保传入的数组类型为 `IMenu` 的实现类
   */
  menuList: {
    type: Array<IMenu>,
    required: true,
  },
})
</script>

<template>
  <template
    v-for="menu in menuList"
    :key="menu.id"
  >
    <template v-if="!menu.isDisabled">
      <ElSubMenu
        v-if="menu.children && menu.children.length > 0"
        :id="menu.id"
        :index="`${menu.id}`"
      >
        <template #title>
          <i
            :class="menu.icon"
            class="iconfont menu-icon"
          />
          <span>{{ menu.name }}</span>
        </template>
        <ChildMenu :menu-list="menu.children" />
      </ElSubMenu>
      <ElMenuItem
        v-else
        :id="menu.id"
        :index="menu.path"
      >
        <template #title>
          <i
            :class="menu.icon"
            class="iconfont menu-icon"
          />
          <span>
            {{ menu.name }}
          </span>
        </template>
      </ElMenuItem>
    </template>
  </template>
</template>

<style lang="scss" scoped>
.menu-icon {
  margin-right: 5px;
}
</style>
