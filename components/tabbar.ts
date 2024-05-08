import { AirApi } from "../config/AirApi"

Component({
  data: {
    selected: 0
  },
  properties: {
    data: {
      type: Object,
      default: {}
    }
  },
  lifetimes: {
    ready() {
      this.setData({
        list: this.properties.data.list || [],
        color: this.properties.data.color || "#333",
        selectedColor: this.properties.data.selectedColor || "#60ac72",
        selected: this.properties.data.selected || 0,
      })
    }
  },
  methods: {
    switchTab(e: any) {
      const data = e.currentTarget.dataset
      this.setData({
        selected: data.index
      })
      AirApi.vibrateShort()
      this.triggerEvent('changeTab', data.index)
    }
  }
})