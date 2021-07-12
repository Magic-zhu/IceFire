import React, { Component } from 'react';
import {
  ChromeOutlined,
  AppstoreOutlined,
  Html5Outlined,
  CodeOutlined,
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import styles from './index.less';

class SideBar extends Component<any> {
  state = {
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

  goToPage(path: string, index: number) {
    this.props.history.push(path);
    this.setState({
      activeIndex: index,
    });
  }

  render() {
    const { activeIndex } = this.state;
    return (
      <div className={styles.wrapper}>
        <div className={styles.functionList}>
          {this.state.functionList.map((e: any, index: number) => {
            return (
              <p
                className={
                  activeIndex == index
                    ? styles.functionItemActive
                    : styles.functionItem
                }
                onClick={() => {
                  this.goToPage(e.path, index);
                }}
                key={`${index}ss`}
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
