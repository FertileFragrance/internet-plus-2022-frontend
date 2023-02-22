import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const routes = [
  {
    path: "/layout",
    name: "layout",
    component: () => import("@/components/Layout"),
    redirect: "/penalty",
    children: [
      {
        //迭代一查询
        path: "/penalty",
        name: "PenaltyManage",
        component: () => import("@/components/PenaltyManage"),
      },
      {
        //查看详情
        path: "/check",
        name: "Check",
        component: () => import("@/components/Check"),
      },
      {
        //监管动态
        path: "/trend",
        name: "trend",
        component: () => import("@/views/Trend/Trend"),
      },
    ],
  },
  {
    path: "/layout2",
    name: "layout2",
    component: () => import("@/components/Layout2"),
    redirect: "/penalty",
    children: [
      {
        //全国区域分析
        path: "/area",
        name: "Area",
        component: () => import("@/views/Area/Area"),
      },
      {
        //总体处罚情况
        path: "/global",
        name: "Global",
        component: () => import("@/views/Global/Global"),
      },
      {
        //处罚决定分析
        path: "/decision",
        name: "Decision",
        component: () => import("@/views/Decision/Decision"),
      },
      {
        //业务领域/违规点分析
        path: "/violation",
        name: "Violation",
        component: () => import("@/views/Violation/Violation"),
      },
    ],
  },
  {
    path: "/",
    redirect: "/layout",
  },
];
const createRouter = () =>
    new VueRouter({
      // mode: 'history', // require service support
      scrollBehavior: () => ({ y: 0 }),
      routes,
    });
const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
