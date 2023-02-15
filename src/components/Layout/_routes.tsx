import {
  AimOutlined,
  ApiOutlined,
  BarsOutlined,
  BlockOutlined,
  BookOutlined,
  BugOutlined,
  CloudServerOutlined,
  CodeOutlined,
  CrownFilled,
  DatabaseFilled,
  DatabaseOutlined,
  EditOutlined,
  HeatMapOutlined,
  RobotOutlined,
  SettingOutlined,
  SmileFilled,
  TrophyOutlined,
  UngroupOutlined
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
            icon: <HeatMapOutlined />,
            component: './Welcome',
            routes: [
              {
                path: '/data-portal/perception/clip-list',
                name: 'Clip List',
                icon: <DatabaseOutlined />,
                component: './Welcome'
              },
              {
                path: '/data-portal/perception/frame-list',
                name: 'Frame List',
                icon: <DatabaseOutlined />,
                component: './Welcome'
              },
              {
                path: '/data-portal/perception/corner-cases',
                name: 'Corner Cases',
                icon: <DatabaseOutlined />,
                component: './Welcome'
              }
            ]
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
            path: '/data-portal/map',
            name: '地图数据',
            icon: <AimOutlined />,
            component: './Welcome',
            routes: [
              {
                path: '/data-portal/map/raw',
                name: 'Raw Data',
                icon: <DatabaseOutlined />,
                component: './Welcome'
              },
              {
                path: '/data-portal/map/pcd',
                name: 'PCD Data',
                icon: <DatabaseOutlined />,
                component: './Welcome'
              },
              {
                path: '/data-portal/map/gcp',
                name: 'GCP Data',
                icon: <DatabaseOutlined />,
                component: './Welcome'
              },
              {
                path: '/data-portal/map/hd-map',
                name: 'HDMap Data',
                icon: <DatabaseOutlined />,
                component: './Welcome'
              },
              {
                path: '/data-portal/map/intermediate',
                name: 'Intermediate Data',
                icon: <DatabaseOutlined />,
                component: './Welcome'
              }
            ]
          },
          {
            path: '/data-portal/setting',
            name: '配置管理',
            icon: <SettingOutlined />,
            component: './Welcome',
            routes: [
              {
                path: '/data-portal/setting/biz-configs',
                name: 'Biz Configs',
                icon: <DatabaseOutlined />,
                component: './Welcome'
              },
              {
                path: '/data-portal/setting/predefined-tags',
                name: 'Predefined Tags',
                icon: <DatabaseOutlined />,
                component: './Welcome'
              }
            ]
          },
          {
            path: '/data-portal/auth',
            name: '权限管理',
            icon: <ApiOutlined />,
            component: './Welcome',
            routes: [
              {
                path: '/data-portal/auth/users',
                name: 'Users',
                icon: <DatabaseOutlined />,
                component: './Welcome'
              },
              {
                path: '/data-portal/auth/roles',
                name: 'Roles',
                icon: <DatabaseOutlined />,
                component: './Welcome'
              },
              {
                path: '/data-portal/auth/permissions',
                name: 'Permissions',
                icon: <DatabaseOutlined />,
                component: './Welcome'
              }
            ]
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
            path: '/ai-platform/dataset',
            name: '数据管理',
            icon: <DatabaseOutlined />
          },
          {
            path: '/ai-platform/model',
            name: '模型管理',
            icon: <BlockOutlined />,
            component: './Welcome',
            routes: [
              {
                path: '/ai-platform/model/list',
                name: '模型列表',
                icon: <BarsOutlined />,
                component: './Welcome'
              },
              {
                path: '/ai-platform/model/optimization',
                name: '模型优化',
                icon: <BugOutlined />,
                component: './Welcome'
              }
            ]
          },
          {
            path: '/ai-platform/train',
            name: '训练管理',
            icon: <UngroupOutlined />,
            component: './Welcome'
          },
          {
            path: '/ai-platform/image',
            name: '镜像管理',
            icon: <TrophyOutlined />,
            component: './Welcome'
          },
          {
            path: '/ai-platform/algo',
            name: '算法开发',
            icon: <EditOutlined />,
            component: './Welcome',
            routes: [
              {
                path: '/ai-platform/algo/notebook',
                name: 'Notebook',
                icon: <BookOutlined />,
                component: './Welcome'
              },
              {
                path: '/ai-platform/algo/list',
                name: '算法管理',
                icon: <CodeOutlined />,
                component: './Welcome'
              }
            ]
          },
          {
            path: '/ai-platform/deploy',
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
