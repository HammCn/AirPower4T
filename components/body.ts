Component({
  properties: {
    tabbar: {
      type: Boolean,
      value: false
    },
    footer: {
      type: Boolean,
      value: false
    }
  },
  data: {
    clazz: ""
  },
  lifetimes: {
    ready() {
      this.initClassName()
    }
  },
  methods: {
    initClassName() {
      const clazzArr: string[] = ["a-body"]
      if (this.properties.tabbar) {
        clazzArr.push("has-tabbar")
      }
      if (this.properties.footer) {
        clazzArr.push("has-footer")
      }
      this.setData({
        clazz: clazzArr.join(" ")
      })
    }
  }
})
