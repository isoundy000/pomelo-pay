import * as moment from 'moment';
import { STATUS } from '../constants';

class Utility {
    static isMatched(val, toCompare) {
        if (!val) {
            return false;
        }

        if (!toCompare) {
            return false;
        }
        
        let _val = val.replace(' ','');
        let _toCompare = toCompare.replace(' ', '');
        
        if (_val.toLowerCase() === _toCompare.toLowerCase()) {
            return true;
        }

        return false;

    }

    static fromNow(val) {
        return moment(val).format("LLL");
    }

    static SumAll(arr) {
        return arr
        .filter(s => (s.status === STATUS.SUCCESS && s.type === 'payment') || (s.status === STATUS.REFUND && s.type === 'payment'))
        .map(s => s.amount)
        .reduce((prev, val) => val + prev, 0).toFixed(2);
    }

    static WalletAmount(arr) {
        return arr
        .filter(s => s.status === STATUS.REFUND && s.type !== 'payment')
        .map(s => s.amount)
        .reduce((prev, val) => val + prev, 0).toFixed(2);

    }
}

export default Utility;