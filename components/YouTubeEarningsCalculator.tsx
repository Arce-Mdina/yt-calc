'use client';

import { useState } from "react";

export default function YouTubeEarningsCalculator() {
  const [views, setViews] = useState<number>(1000000);
  const [monetizedPercent, setMonetizedPercent] = useState<number>(60);
  const [cpmLow, setCpmLow] = useState<number>(2);
  const [cpmHigh, setCpmHigh] = useState<number>(10);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const calculateEarnings = (cpm: number) => {
    const monetizedViews = (views * monetizedPercent) / 100;
    const grossRevenue = (monetizedViews / 1000) * cpm;
    const netRevenue = grossRevenue * 0.55; // YouTube takes 45% cut, so you get 55%
    return netRevenue.toFixed(2);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <h1 className="text-2xl font-bold mb-4 text-red-600">YouTube Video Earnings Estimator</h1>

        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Total Views:</span>
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={views.toLocaleString()}
              onChange={(e) => {
                const raw = e.target.value.replace(/,/g, '');
                setViews(Number(raw));
              }}
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Monetized Views (%):</span>
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={monetizedPercent.toLocaleString()}
              onChange={(e) => {
                const raw = e.target.value.replace(/,/g, '');
                setMonetizedPercent(Number(raw));
              }}
            />
          </label>

          <label className="block">
            <span className="text-gray-700">CPM Range ($):</span>
            <div className="flex space-x-2">
              <input
                type="text"
                inputMode="numeric"
                pattern="\d*"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={cpmLow.toLocaleString()}
                onChange={(e) => {
                  const raw = e.target.value.replace(/,/g, '');
                  setCpmLow(Number(raw));
                }}
                placeholder="Low"
              />
              <input
                type="text"
                inputMode="numeric"
                pattern="\d*"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={cpmHigh.toLocaleString()}
                onChange={(e) => {
                  const raw = e.target.value.replace(/,/g, '');
                  setCpmHigh(Number(raw));
                }}
                placeholder="High"
              />
            </div>
          </label>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">Estimated Earnings:</h2>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center shadow-sm flex flex-col">
              <p className="text-sm text-gray-500">Conservative (CPM ${cpmLow})</p>
              <div className="mt-2">
                <span className="text-xl font-bold text-gray-800 break-words block text-balance leading-tight">
                  ${Number(calculateEarnings(cpmLow)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center shadow-sm flex flex-col">
              <p className="text-sm text-gray-500">Likely (CPM ${(cpmLow + cpmHigh) / 2})</p>
              <div className="mt-2">
                <span className="text-xl font-bold text-gray-800 break-words block text-balance leading-tight">
                  ${Number(calculateEarnings((cpmLow + cpmHigh) / 2)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center shadow-sm flex flex-col">
              <p className="text-sm text-gray-500">Optimistic (CPM ${cpmHigh})</p>
              <div className="mt-2">
                <span className="text-xl font-bold text-gray-800 break-words block text-balance leading-tight">
                  ${Number(calculateEarnings(cpmHigh)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setShowDisclaimer(true)}
            className="text-sm text-gray-600 hover:underline cursor-pointer"
          >
            Disclaimer & How This Is Calculated
          </button>
        </div>

        {showDisclaimer && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center z-50 px-4">
            <div className="bg-white p-6 rounded-xl max-w-lg w-full shadow-lg relative">
              <button
                className="absolute top-2 right-3 text-gray-500 text-lg hover:text-gray-700 cursor-pointer"
                onClick={() => setShowDisclaimer(false)}
              >
                ×
              </button>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Estimate Disclaimer</h3>
              <p className="text-sm text-gray-700">
                This calculator provides a rough estimate and actual earnings may vary depending on multiple factors including region, viewer demographics, and YouTube's revenue sharing model.
              </p>
              <p className="text-sm text-gray-700 mt-3">
                <strong>Calculation:</strong> Monetized Views = Total Views × Monetized %.<br />
                Gross Revenue = (Monetized Views ÷ 1000) × CPM.<br />
                Net Revenue = Gross Revenue × 55%.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
