import React, { Component } from 'react';
import styles from './index.less';
import { ChromeOutlined, AppstoreOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
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
    let { activeIndex } = this.state;
    return (
      <div className={styles.wrapper}>
        <div className={styles.logoBox}></div>
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
