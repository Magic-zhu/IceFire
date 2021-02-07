import React, { Component } from 'react';
import styles from './index.less';
export default class Main extends Component{
    constructor(props:any){
        super(props)
    }
    render(){
        return (
            <div className={styles.wrapper}>
                {this.props.children}
            </div>
        )
    }
}