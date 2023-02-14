import { useState } from 'react'
import {
  GitlabFilled,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined
} from '@ant-design/icons'
import type { ProSettings } from '@ant-design/pro-components'
import { PageContainer, ProLayout, ProCard } from '@ant-design/pro-components'
import { Input } from 'antd'
import { routes } from './_routes'

export const CoreLayout = () => {
  const settings: ProSettings | undefined = {
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: true
  }

  const [pathname, setPathname] = useState('/data-portal/perception')

  return (
    <div id="test-pro-layout" className="h-screen">
      <ProLayout
        bgLayoutImgList={[]}
        token={{
          header: {
            colorBgHeader: '#292f33',
            colorHeaderTitle: '#fff',
            colorTextMenu: '#dfdfdf',
            colorTextMenuSecondary: '#dfdfdf',
            colorTextMenuSelected: '#fff',
            colorBgMenuItemSelected: '#22272b',
            colorTextMenuActive: 'rgba(255,255,255,0.85)',
            colorTextRightActionsItem: '#dfdfdf'
          },
          colorTextAppListIconHover: '#fff',
          colorTextAppListIcon: '#dfdfdf'
          // sider: {
          //   colorMenuBackground: '#fff',
          //   colorMenuItemDivider: '#dfdfdf',
          //   colorBgMenuItemHover: '#f6f6f6',
          //   colorTextMenu: '#595959',
          //   colorTextMenuSelected: '#242424',
          //   colorTextMenuActive: '#242424',
          //   colorBgMenuItemCollapsedHover: '#242424'
          // }
        }}
        {...routes}
        location={{
          pathname
        }}
        menu={{
          type: 'group'
        }}
        title="Pegasus"
        logo={null}
        // logo="http://dataportal.pegasus.tech/logo.png"
        avatarProps={{
          src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          size: 'small',
          title: 'Universe'
        }}
        actionsRender={props => {
          if (props.isMobile) return []
          return [
            props.layout !== 'side' && document.body.clientWidth > 1400 ? (
              <div
                key="SearchOutlined"
                aria-hidden
                className="ml-6 flex items-center"
                onMouseDown={e => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
              >
                <Input
                  className="ml-3 rounded"
                  prefix={<SearchOutlined className="text-black-400/[.15]" />}
                  placeholder="search"
                  bordered={false}
                />
                <PlusCircleFilled
                  style={{
                    color: 'var(--ant-primary-color)'
                  }}
                  className="text-base"
                />
              </div>
            ) : undefined,
            // <InfoCircleFilled key="InfoCircleFilled" />,
            <QuestionCircleFilled key="QuestionCircleFilled" />,
            <GitlabFilled key="GithubFilled" />
          ]
        }}
        menuFooterRender={props => {
          if (props?.collapsed) return undefined
          return (
            <div className="p-3 text-center">
              <div>© 2021 Pegasus</div>
            </div>
          )
        }}
        onMenuHeaderClick={e => console.log(e)}
        menuItemRender={(item, dom) => (
          <div
            onClick={() => {
              setPathname(item.path || '/welcome')
            }}
          >
            {dom}
          </div>
        )}
        {...settings}
      >
        <PageContainer>
          <ProCard className="h-screen min-h-[800px]">
            <div />
          </ProCard>
        </PageContainer>
      </ProLayout>
    </div>
  )
}
