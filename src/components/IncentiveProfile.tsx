import React from 'react';
import { IncentiveSignals } from '../types';

interface Props {
  signals: IncentiveSignals;
  onUpdate: (key: keyof IncentiveSignals, value: boolean) => void;
}

const IncentiveProfile: React.FC<Props> = ({ signals, onUpdate }) => (
  <div className="p-6 bg-slate-900 rounded-lg border border-slate-700">
    <h3 className="text-white font-bold mb-4">SME Incentive Profile</h3>
    {/* Profile Logic Here */}
  </div>
);

export default IncentiveProfile;
