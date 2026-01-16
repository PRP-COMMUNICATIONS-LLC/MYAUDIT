import React, { useState } from 'react';
import { LedgerEntry } from '../../types';
import { IncentiveMatchBadge } from '../incentives/IncentiveMatchBadge';

interface Props {
  transaction: LedgerEntry;
}

const TransactionRow: React.FC<Props> = ({ transaction }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const debit = transaction.debit ?? 0;
  const credit = transaction.credit ?? 0;
  const amount = debit > 0 ? debit : credit;

  return (
    <>
      <tr
        className={`border-b border-slate-800 hover:bg-slate-700/50 ${false ? 'cursor-pointer' : ''}`}
        onClick={() => false && setIsExpanded(!isExpanded)}
      >
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{transaction.date}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
          <div className="flex items-center space-x-2">
            <span>{transaction.description}</span>
            <IncentiveMatchBadge category={transaction.category!} />
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-mono text-emerald-400">{amount.toFixed(2)}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{transaction.category}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {/* <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.eInvoiceStatus === 'VALID' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {transaction.eInvoiceStatus}
          </span> */}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">{transaction.confidence ? `${(Number(transaction.confidence) * 100).toFixed(0)}%` : 'N/A'}</td>
      </tr>
      {isExpanded && false && (
        <tr className="bg-slate-800/50">
          <td colSpan={6} className="p-0">
            <div className="p-4">
              {/* {transaction.dieFlags?.map((flag, index) => (
                <DieHint key={index} flag={flag} />
              ))} */}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default TransactionRow;
