import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TransactionList from './components/transaction-list/transaction-list';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Api from './services/api';
import Utility from './pipeline/utility';
import { STATUS } from './constants';

import './App.scss';
const styles = theme => ({
  bootstrapRoot: {
    backgroundColor: '#00bcd4',
    float: 'right',
    margin: '0 20px 0 0',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#33c9dc'    
    }
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.initState();
  }

  componentDidMount() {
    Api.getTransaction().then(
      res => {
        if(res) {
          this.setState({ transactionList: res });
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  initState() {
    this.state.transactionList = [];
  }

  renderTransactionList() {
    if(!this.state.transactionList) {
      return;
    }

    if(this.state.transactionList.length < 1) {
      return;
    }

    if(Object.keys(this.state.transactionList).length < 1){
      return;
    }

    return (
      this.state.transactionList.map(res => {
        return <TransactionList list={res} />
      })
    )
  }

  refund = () => {
    let transactionList = this.state.transactionList;
    transactionList.map((item, index) => {
      if (String(item.status || '').toLowerCase() === STATUS.PENDING) {
        return transactionList[index].status = STATUS.REFUND;
      }
    })
    
    this.setState({transactionList}, () => {console.log(this.state.transactionList)});
  }

  render() {
    const { classes } = this.props;
    const { transactionList } = this.state;
    const total = Utility.SumAll(transactionList);
    const wallet = Utility.WalletAmount(transactionList);

    return (
      <div className="app">
        <img className="logo" src="/images/pp.png"/>
        <div className="legend-container">
          <div className="legend">
            <span className="legend-indicator success"></span>
            <p className="legend-desc">Success</p>
          </div>
          <div className="legend">
            <span className="legend-indicator pending"></span>
            <p className="legend-desc">Pending</p>
          </div>
          <div className="legend">
            <span className="legend-indicator failed"></span>
            <p className="legend-desc">Failed</p>
          </div>
          <div className="legend">
            <span className="legend-indicator refund"></span>
            <p className="legend-desc">Refund</p>
          </div>
        </div>
        <div className="app-container">
          <div className="header-container">
            <p className="h-left h-title">My Transactions</p>
            <p className="h-left">
              <span>Wallet Amount: {wallet}</span>
              <span className="h-currency"> MYR</span>
            </p>
            <p className="h-right">
              <span>Total Expenses : {total}</span>
              <span className="h-currency"> MYR</span>
            </p>
          </div>

          <div className="body-container">
            {this.renderTransactionList()}
          </div>

          <Button className={classNames(classes.bootstrapRoot)} variant="contained" size="large" onClick={this.refund}>Refund for Pending</Button>
        </div>        
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
