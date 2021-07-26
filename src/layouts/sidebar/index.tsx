import React, { Component } from 'react';
import {
  ChromeOutlined,
  AppstoreOutlined,
  Html5Outlined,
  CodeOutlined,
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
// @ts-ignore
import styles from './index.less';

interface MenuItem {
  icon: any;
  title: string;
  path: string;
}

interface State {
  functionList: MenuItem[];
  activeIndex: number;
}

class SideBar extends Component<null, State> {
  constructor() {
    super(null);
    this.state = {
      functionList: [
        {
          icon: <AppstoreOutlined />,
          title: '应用',
          path: '/',
        },
        {
          icon: <ChromeOutlined />,
          title: '性能分析',
          path: '/performance/home',
        },
        {
          icon: <Html5Outlined />,
          title: '前端手册',
          path: '/performance/manul',
        },
        {
          icon: <CodeOutlined />,
          title: '终端工具',
          path: '/tool/terminal',
        },
      ],
      activeIndex: 0,
    };
  }

  goToPage(path: string, index: number) {
    const { history } = this.props;
    // @ts-ignore
    history.push(path);
    this.setState({
      activeIndex: index,
    });
  }

  render() {
    const { activeIndex, functionList } = this.state;
    const { goToPage } = this;
    return (
      <div className={styles.wrapper}>
        <div className={styles.functionList}>
          {functionList.map((e: any, index: number) => {
            return (
              <p
                className={
                  activeIndex === index
                    ? styles.functionItemActive
                    : styles.functionItem
                }
                onClick={() => {
                  goToPage(e.path, index);
                }}
                key={e.path}
              >
                <span className={styles.icons}>{e.icon}</span>
                <span>{e.title}</span>
              </p>
            );
          })}
        </div>
      </div>
    );
  }
}
export default withRouter(SideBar);
