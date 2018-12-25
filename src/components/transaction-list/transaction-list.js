import React, { Component } from 'react';
import Utility from '../../pipeline/utility';
import TopupIcon from "@material-ui/icons/CloudUploadOutlined";
import AttachMoneyIcon from "@material-ui/icons/AttachMoneyOutlined";
import './transaction-list.scss';

class TransactionList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }
    render() {
        const list = this.props.list;
        const isTopUp = Utility.isMatched(list.description, 'topup');
        const isRefund = Utility.isMatched(list.status, 'refund');
        const fromNow = Utility.fromNow(list.createdAt);
        const desc = isTopUp ? list.description : `Paid for ${list.description}`;
        const status = isTopUp ? 'Received' : 'Payment'
        return (
            <div className={`t-list-wrapper`}>
                {isTopUp ? <TopupIcon className="t-l-icon"/> : <AttachMoneyIcon className="t-l-icon" /> }
                <div className="t-l-left">
                    <p className="t-l-desc">{desc}</p>
                    <p className="t-l-status">{ status } - { fromNow }</p>
                </div>
                <div className={`t-l-right ${list.status}`}>
                    <span className="t-l-amount">
                        {isTopUp || isRefund ? '+' : '-'}
                        <span className="t-l-amount-span">{list.amount.toFixed(2)}</span> 
                    </span>
                    <span className="t-l-currency">{list.currency}</span>
                </div>
            </div>
        )
    }
}

export default TransactionList;