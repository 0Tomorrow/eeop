/**
 * 我们为了统一方便的管理路由和页面的关系，将配置信息统一抽离到 common/nav.js 下，同时应用动态路由
 */

import dynamic from 'dva/dynamic';

// dynamic包装 函数
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

// nav data
export const getNavData = app => [
  {
    component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    layout: 'BasicLayout',
    name: '首页',
    path: '/',
    children: [
      {
        name: '组织管理',
        icon: 'usergroup-add',
        path: 'orgManage',
        component: dynamicWrapper(app, [], () => import('../routes/orgManage/Notify')),
      },
      {
        name: '通知管理',
        icon: 'mail',
        path: 'notifyManage',
        component: dynamicWrapper(app, [], () => import('../routes/notifyManage/Notify')),
      },
      {
        name: '应用管理',
        icon: 'appstore',
        path: 'appManage',
        component: dynamicWrapper(app, [], () => import('../routes/appManage/Notify')),
      },
      {
        name: '用户管理',
        icon: 'user',
        path: 'userManager',
        component: dynamicWrapper(app, [], () => import('../routes/userManage/Notify')),
      },
    ],
  },
  {
    component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    path: '/user',
    layout: 'UserLayout',
    children: [
      {
        name: '账户',
        icon: 'user',
        path: 'user',
        children: [
          {
            name: '登录',
            path: 'login',
            component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
          },
        ],
      },
    ],
  },
];
