<template>
  <template
    v-for="menu in menuList"
    :key="menu.id"
  >
    <template v-if="!menu.isHide">
      <el-sub-menu
        v-show="menu.children && menu.children.length > 0"
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
        v-show="!menu.children || menu.children.length === 0"
        :id="menu.id"
        :index="menu.path"
      >
        <i
          class="iconfont menu-icon"
          :class="menu.icon"
        />
        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <span slot="title">{{ menu.name }}</span>
      </el-menu-item>
    </template>
  </template>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { IMenu } from '@/airpower/interface/IMenu'

defineProps({
  /**
   * # 菜单列表
   */
  menuList: {
    type: Array as PropType<IMenu[]>,
    default: () => [],
  },
})
</script>
<style lang="scss" scoped>
.menu-icon {
  margin-right: 5px;
}
</style>
