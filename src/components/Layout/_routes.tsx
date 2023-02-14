import {
  AimOutlined,
  ApiOutlined,
  CloudServerOutlined,
  CrownFilled,
  DatabaseFilled,
  DatabaseOutlined,
  RobotOutlined,
  SettingOutlined,
  SmileFilled
} from '@ant-design/icons'

export const routes = {
  route: {
    path: '/',
    routes: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        icon: <SmileFilled />,
        component: './Welcome'
      },
      {
        path: '/data-portal',
        name: 'DataPortal',
        icon: <DatabaseFilled />,
        access: 'canAdmin',
        component: './Admin',
        routes: [
          {
            path: '/data-portal/perception',
            name: '感知数据',
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
            component: './Welcome'
          },
          {
            path: '/data-portal/road-test',
            name: '路测数据',
            icon: <DatabaseOutlined />,
            component: './Welcome',
            routes: [
              {
                path: '/data-portal/road-test/clip-list',
                name: 'Clip List',
                icon: <DatabaseOutlined />,
                component: './Welcome'
              },
              {
                path: '/data-portal/road-test/issue-list',
                name: 'Issue List',
                icon: <DatabaseOutlined />,
                component: './Welcome'
              },
              {
                path: '/data-portal/road-test/metrics',
                name: 'Test Metrics',
                icon: <DatabaseOutlined />,
                component: './Welcome'
              }
            ]
          },
          {
            path: '/data-portal/sub-page3',
            name: '地图数据',
            icon: <AimOutlined />,
            component: './Welcome'
          },
          {
            path: '/data-portal/sub-page4',
            name: '配置管理',
            icon: <SettingOutlined />,
            component: './Welcome'
          },
          {
            path: '/data-portal/sub-page5',
            name: '权限管理',
            icon: <ApiOutlined />,
            component: './Welcome'
          }
        ]
      },
      {
        name: 'AutoBot',
        icon: <RobotOutlined />,
        path: '/autobot',
        component: './ListTableList',
        routes: [
          // TODO
        ]
      },
      {
        name: 'AI-Platform',
        icon: <CloudServerOutlined />,
        path: '/ai-platform',
        component: './ListTableList',
        routes: [
          {
            path: '/ai-platform/sub-page',
            name: '数据集管理',
            icon: <CrownFilled />,
            routes: [
              {
                path: 'sub-sub-page1',
                name: '数据列表',
                icon: <CrownFilled />,
                component: './Welcome'
              }
            ]
          },
          {
            path: '/ai-platform/sub-page2',
            name: '模型管理',
            icon: <CrownFilled />,
            component: './Welcome'
          },
          {
            path: '/ai-platform/sub-page3',
            name: '训练管理',
            icon: <CrownFilled />,
            component: './Welcome'
          },
          {
            path: '/ai-platform/sub-page4',
            name: '镜像管理',
            icon: <CrownFilled />,
            component: './Welcome'
          },
          {
            path: '/ai-platform/sub-page5',
            name: '算法管理',
            icon: <CrownFilled />,
            component: './Welcome'
          },
          {
            path: '/ai-platform/sub-page6',
            name: '云端部署',
            icon: <CrownFilled />,
            component: './Welcome'
          }
        ]
      }
      // {
      //   path: 'https://ant.design',
      //   name: '外网外链',
      //   icon: <ChromeFilled />
      // }
    ]
  },
  location: {
    pathname: '/'
  },
  appList: []
}
