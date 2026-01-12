import React from 'react';

interface OptimizationCardProps {
    projectedChargeableIncome: number;
}

const OptimizationCard: React.FC<OptimizationCardProps> = ({ projectedChargeableIncome }) => {
    return (
        <div className="p-6 bg-green-50 rounded-xl border border-green-100 mt-8">
            <h4 className="text-lg font-bold text-green-800">Tax Optimization</h4>
            <p className="text-sm text-green-700">Projected chargeable income: RM {projectedChargeableIncome.toLocaleString()}</p>
        </div>
    );
};

export default OptimizationCard;
