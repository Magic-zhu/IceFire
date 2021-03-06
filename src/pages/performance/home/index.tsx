import React, { Component } from 'react';
import { Button, Input, Spin, Table } from 'antd';
import styles from './index.less';
const ipcRenderer = window.ipcRenderer;

interface State {
  url: string;
  loading: boolean;
  score: number;
  dataSource: any[];
  tableColumns: any[];
  dataSourceMain:any []
}

interface lightHouseResult {
  [key: string]: any;
}

export default class Home extends Component {
  state: State = {
    url: '',
    loading: false,
    score: 0,
    tableColumns: [
      {
        title: '指标类型',
        dataIndex: 'id',
        key: 'id',
        width:300
      },
      {
        title: '值',
        dataIndex: 'displayValue',
        key: 'displayValue',
      },
      {
        title: '得分',
        dataIndex: 'score',
        key: 'score',
        render:(score)=>{
          score = Math.ceil(Number(score)*100)
          const color = this.scoreLevel(score)
          return <span style={{color}}>{score}</span>
        }
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
      },
    ],
    dataSource: [],
    dataSourceMain:[],
  };
  componentDidMount() {
    ipcRenderer.on('back_lighthouse', (e, data: lightHouseResult) => {
      this.setState({
        loading: false,
      });
      this.state.loading = false;
      console.log(data)
      const dataSource = Object.values(data.audits);
      const dataSourceMain = [
        data.audits['first-contentful-paint'],
        data.audits['first-meaningful-paint'],
        data.audits['largest-contentful-paint'],
        data.audits['speed-index'],
        data.audits['total-blocking-time'],
        data.audits['cumulative-layout-shift'],
      ];

      this.setState({
        score: Math.ceil(data.score * 100),
        dataSource,
        dataSourceMain,
      });
    });
  }
  startAnalyse() {
    ipcRenderer.send('lighthouse', this.state.url);
    this.setState({
      loading: true,
    });
  }
  urlChange(e: any) {
    this.setState({
      url: e.target.value,
    });
  }
  scoreLevel(input) {
    if (input <= 60) {
      return 'red';
    } else if (this.state.score > 60 && this.state.score < 80) {
      return 'orange';
    } else {
      return 'green';
    }
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <Spin spinning={this.state.loading}>
          <div className={styles.main}>
            <p>
              <Input
                placeholder="输入待测试的地址"
                style={{ width: '400px' }}
                onChange={(e) => {
                  this.urlChange(e);
                }}
              />
            </p>
            <p className={styles.mainBtn}>
              <Button
                type="primary"
                onClick={() => {
                  this.startAnalyse();
                }}
              >
                开始检测
              </Button>
            </p>
          </div>
          <div className={styles.report}>
            <p className={styles.totalScore}>
              <span>最终性能得分:</span>
              <span style={{ color: this.scoreLevel(this.state.score) }}>
                {this.state.score}
              </span>
            </p>
            <h3>主要性能指标</h3>
            <Table
              bordered
              dataSource={this.state.dataSourceMain}
              columns={this.state.tableColumns}
            />
            <h3>完整性能指标</h3>
            <Table
              bordered
              dataSource={this.state.dataSource}
              columns={this.state.tableColumns}
            />
          </div>
        </Spin>
      </div>
    );
  }
}
