import React, { useState, useMemo } from 'react';

// --- Tax Calculation Logic ---
// Using YA 2024 rates as a proxy for YA 2026.

const calculateSmeCorporateTax = (profit: number): number => {
  if (profit <= 0) return 0;
  let tax = 0;
  if (profit > 600000) {
    tax += (profit - 600000) * 0.24;
    profit = 600000;
  }
  if (profit > 150000) {
    tax += (profit - 150000) * 0.17;
    profit = 150000;
  }
  tax += profit * 0.15;
  return tax;
};

const calculatePersonalTax = (chargeableIncome: number): number => {
    if (chargeableIncome <= 5000) return 0;
    let tax = 0;
    const brackets = [
        { limit: 5000, rate: 0.00, cumulative: 0 },
        { limit: 20000, rate: 0.01, cumulative: 0 },
        { limit: 35000, rate: 0.03, cumulative: 150 },
        { limit: 50000, rate: 0.06, cumulative: 600 },
        { limit: 70000, rate: 0.11, cumulative: 1500 },
        { limit: 100000, rate: 0.19, cumulative: 3700 },
        { limit: 400000, rate: 0.25, cumulative: 9400 },
        { limit: 600000, rate: 0.26, cumulative: 84400 },
        { limit: 1000000, rate: 0.28, cumulative: 136400},
        { limit: Infinity, rate: 0.30, cumulative: 0 } // handled separately
    ];
    
    let lastLimit = 0;
    for (const bracket of brackets) {
        if (chargeableIncome > bracket.limit) {
            lastLimit = bracket.limit;
            continue;
        }
        const prevBracket = brackets[brackets.indexOf(bracket) - 1] || { limit: 0, cumulative: 0 };
        tax = prevBracket.cumulative + (chargeableIncome - lastLimit) * bracket.rate;
        return tax;
    }

    // Handle top bracket
    tax = 136400 + 112000 + (chargeableIncome - 1000000) * 0.30;
    return tax;
};


const DirectorRemunerationAdvisor: React.FC = () => {
  const [profitBeforeSalary, setProfitBeforeSalary] = useState<number>(200000);
  const [directorSalary, setDirectorSalary] = useState<number>(80000);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-MY', { style: 'currency', currency: 'MYR' }).format(value);
  };

  const results = useMemo(() => {
    // Scenario 1: Take Salary
    const companyProfitS1 = Math.max(0, profitBeforeSalary - directorSalary);
    const companyTaxS1 = calculateSmeCorporateTax(companyProfitS1);
    const directorPersonalTaxS1 = calculatePersonalTax(directorSalary);
    const totalTaxS1 = companyTaxS1 + directorPersonalTaxS1;
    const netToCompanyS1 = companyProfitS1 - companyTaxS1;
    const netToDirectorS1 = directorSalary - directorPersonalTaxS1;
    const totalNetCashS1 = netToCompanyS1 + netToDirectorS1;

    // Scenario 2: Take Dividends
    const companyProfitS2 = profitBeforeSalary;
    const companyTaxS2 = calculateSmeCorporateTax(companyProfitS2);
    const dividendAvailable = companyProfitS2 - companyTaxS2;
    const totalTaxS2 = companyTaxS2;
    const totalNetCashS2 = dividendAvailable;

    return {
      s1: { companyTax: companyTaxS1, directorTax: directorPersonalTaxS1, totalTax: totalTaxS1, totalNet: totalNetCashS1, netToDirector: netToDirectorS1 },
      s2: { companyTax: companyTaxS2, directorTax: 0, totalTax: totalTaxS2, totalNet: totalNetCashS2, netToDirector: dividendAvailable },
    };
  }, [profitBeforeSalary, directorSalary]);

  const taxSavings = results.s2.totalTax - results.s1.totalTax;

  return (
    <div className="glass-card p-5 border border-white/10 mt-6">
      <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Director Remuneration Scenario Planner</h3>
      
      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="profit" className="block text-xs text-gray-400 mb-1">Projected Profit (Before Director Salary)</label>
          <input 
            type="number"
            id="profit"
            value={profitBeforeSalary}
            onChange={(e) => setProfitBeforeSalary(Number(e.target.value))}
            className="w-full bg-slate-800/50 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-soft-mint"
          />
        </div>
        <div>
          <label htmlFor="salary" className="block text-xs text-gray-400 mb-1">Proposed Director Salary</label>
          <input 
            type="number"
            id="salary"
            value={directorSalary}
            onChange={(e) => setDirectorSalary(Number(e.target.value))}
            className="w-full bg-slate-800/50 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-soft-mint"
          />
        </div>
      </div>

      {/* Results Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scenario 1: Salary */}
        <div className="bg-slate-800/30 p-4 rounded-lg">
          <h4 className="font-bold text-white text-center mb-3">Scenario: Salary + Remaining as Dividend</h4>
          <p className="text-xs text-gray-400">Company Tax: <span className="font-mono text-white float-right">{formatCurrency(results.s1.companyTax)}</span></p>
          <p className="text-xs text-gray-400">Director Personal Tax: <span className="font-mono text-white float-right">{formatCurrency(results.s1.directorTax)}</span></p>
          <hr className="my-2 border-white/10" />
          <p className="text-xs font-bold text-white">Total Tax Paid: <span className="font-mono float-right">{formatCurrency(results.s1.totalTax)}</span></p>
          <hr className="my-2 border-white/10" />
          <p className="text-xs text-gray-300">Net in Director's Pocket: <span className="font-mono text-white float-right">{formatCurrency(results.s1.netToDirector)}</span></p>
        </div>

        {/* Scenario 2: Dividend */}
        <div className="bg-slate-800/30 p-4 rounded-lg">
          <h4 className="font-bold text-white text-center mb-3">Scenario: All as Dividend</h4>
          <p className="text-xs text-gray-400">Company Tax: <span className="font-mono text-white float-right">{formatCurrency(results.s2.companyTax)}</span></p>
          <p className="text-xs text-gray-400">Director Personal Tax: <span className="font-mono text-white float-right">{formatCurrency(results.s2.directorTax)}</span></p>
          <hr className="my-2 border-white/10" />
          <p className="text-xs font-bold text-white">Total Tax Paid: <span className="font-mono float-right">{formatCurrency(results.s2.totalTax)}</span></p>
          <hr className="my-2 border-white/10" />
          <p className="text-xs text-gray-300">Net in Director's Pocket: <span className="font-mono text-white float-right">{formatCurrency(results.s2.netToDirector)}</span></p>
        </div>
      </div>
      
      {/* Summary */}
      <div className={`mt-6 p-4 rounded-lg text-center ${taxSavings > 0 ? 'bg-soft-mint/20' : 'bg-red-500/20'}`}>
          <p className="font-bold text-sm text-white">
              With this salary, the total tax burden is {taxSavings > 0 ? 'LOWER' : 'HIGHER'} by 
              <span className="text-lg mx-1">{formatCurrency(Math.abs(taxSavings))}</span>.
          </p>
          <p className="text-[10px] text-gray-300 mt-1">This comparison excludes EPF/SOCSO contributions and personal tax reliefs for simplicity.</p>
      </div>

    </div>
  );
};

export default DirectorRemunerationAdvisor;
