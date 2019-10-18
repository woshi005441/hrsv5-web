import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'functionMenu',
      component: () => import('@/components/functionMenu.vue'),
      children: [
        {
          name: '斑马纹表格',
          path: '/zebrapattern',
          component: () => import("@/view/Table/zebrapattern.vue")
        },
        {
          name: '基础选项卡',
          path: '/Tab',
          component: () => import("@/view/Tabs/tab.vue")
        },
        {
          name: '位置变换选项卡',
          path: '/tabPosition',
          component: () => import("@/view/Tabs/tabPosition.vue")
        },
        {
          name: '基础页头',
          path: '/pageHeader',
          component: () => import("@/view/PageHeader/pageHeader.vue")
        },
        {
          name: '基础下拉菜单',
          path: '/dropdown',
          component: () => import("@/view/Dropdown/dropdown.vue")
        },
        {
          name: '按钮下拉菜单',
          path: '/buttondropdown',
          component: () => import("@/view/Dropdown/buttondropdown.vue")
        },
        {
          name: '基础步骤条',
          path: '/steps',
          component: () => import("@/view/Steps/steps.vue")
        },
        {
          name: '简单步骤条',
          path: '/simplesteps',
          component: () => import("@/view/Steps/simplesteps.vue")
        },
        {
          name: '基础对话框',
          path: '/basedialog',
          component: () => import("@/view/Dialog/basedialog.vue")
        },
        {
          name: '嵌入表单对话框',
          path: '/formdialog',
          component: () => import("@/view/Dialog/formdialog.vue")
        },
        {
          name: '嵌套对话框',
          path: '/nestingdialog',
          component: () => import("@/view/Dialog/nestingdialog.vue")
        },
        {
          name: '文字提示信息',
          path: '/tooltip',
          component: () => import("@/view/Tooltip/tooltip.vue")
        },
        {
          name: '基本弹出框',
          path: '/popover',
          component: () => import("@/view/Popover/popover.vue")
        },
        {
          name: '手风琴',
          path: '/collapse',
          component: () => import("@/view/Collapse/collapse.vue")
        },
        {
          name: '基础分割线',
          path: '/divider',
          component: () => import("@/view/Divider/divider.vue")
        },
        {
          name: '垂直分割线',
          path: '/verticaldivider',
          component: () => import("@/view/Divider/verticaldivider.vue")
        },
        {
          name: '无限滚动加载',
          path: '/infiniteScroll',
          component: () => import("@/view/InfiniteScroll/infiniteScroll.vue")
        },
        {
          name: '图片占位',
          path: '/image',
          component: () => import("@/view/Image/image.vue")
        },
        /**Table路由地址信息*/
        {
          name: 'zebrapattern',
          path: '/zebrapattern',
          component: () => import("@/view/Table/zebrapattern.vue")
        },
        {
          name: 'frame',
          path: '/frame',
          component: () => import("@/view/Table/frame.vue")
        },
        {
          name: 'statuTable',
          path: '/statuTable',
          component: () => import("@/view/Table/statuTable.vue")
        },
        {
          name: 'fixedHead',
          path: '/fixedHead',
          component: () => import("@/view/Table/fixedHead.vue")
        },
        {
          name: 'fixedColumn',
          path: '/fixedColumn',
          component: () => import("@/view/Table/fixedColumn.vue")
        },
        {
          name: 'fixedHeadColumn',
          path: '/fixedHeadColumn',
          component: () => import("@/view/Table/fixedHeadColumn.vue")
        }
      ]
    }

  ]
})