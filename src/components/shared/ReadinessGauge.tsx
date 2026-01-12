import React from 'react';

interface ReadinessGaugeProps {
    score: number;
    pendingTasks: number;
    isAuditReady: boolean;
}

export const ReadinessGauge: React.FC<ReadinessGaugeProps> = ({ score, pendingTasks, isAuditReady }) => {
    return (
        <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
            <h4 className="text-lg font-bold text-blue-800">Audit Readiness</h4>
            <p className="text-sm text-blue-700">Readiness score: {score}%</p>
            <p className="text-sm text-blue-700">Pending tasks: {pendingTasks}</p>
            <p className="text-sm text-blue-700">Audit ready: {isAuditReady ? 'Yes' : 'No'}</p>
        </div>
    );
};
