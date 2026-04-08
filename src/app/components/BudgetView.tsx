import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export function BudgetView() {
  const year1BudgetData = [
    { name: 'Development', amount: 1300, color: '#3B82F6' },
    { name: 'Infrastructure', amount: 1560, color: '#8B5CF6' },
    { name: 'Legal', amount: 6000, color: '#EF4444' },
    { name: 'Marketing', amount: 7800, color: '#10B981' },
    { name: 'Contingency', amount: 1666, color: '#F59E0B' }
  ];

  const prizeFundData = [
    { season: 'Season 1 (Nov)', draws: 7, total: 4662 },
    { season: 'Season 2 (Dec)', draws: 7, total: 4662 }
  ];

  const revenueScenarios = [
    { scenario: 'Conservative', subscribers: 150, revenue: 23400, costs: 9660, prizeFund: 9324, net: 4416 },
    { scenario: 'Base Case', subscribers: 250, revenue: 39000, costs: 9660, prizeFund: 9324, net: 20016 },
    { scenario: 'Optimistic', subscribers: 400, revenue: 62400, costs: 9660, prizeFund: 9324, net: 43416 }
  ];

  const threeYearProjection = [
    { year: 'Year 1', subscribers: 250, revenue: 39000, costs: 9660, prizeFund: 18648, net: 10692 },
    { year: 'Year 2', subscribers: 400, revenue: 62400, costs: 10200, prizeFund: 18648, net: 33552 },
    { year: 'Year 3', subscribers: 650, revenue: 101400, costs: 10800, prizeFund: 18648, net: 71952 }
  ];

  const ongoingMonthly = [
    { service: 'Lovable (Pro)', purpose: 'App hosting & deployment', cost: 85 },
    { service: 'Supabase (Pro)', purpose: 'Database, auth, edge functions', cost: 42 },
    { service: 'Resend', purpose: 'Email (free tier)', cost: 0 },
    { service: 'Domain (.nz)', purpose: 'survivethereap.nz', cost: 3 }
  ];

  const COLORS = ['#3B82F6', '#8B5CF6', '#EF4444', '#10B981', '#F59E0B'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Budget Breakdown</h2>
        <p className="text-gray-600">
          Complete financial analysis including development costs, operational expenses, prize fund commitment, and revenue projections
        </p>
      </div>

      {/* Total Budget Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
          <div className="text-sm font-semibold text-blue-600 mb-2">YEAR 1 APP BUDGET</div>
          <div className="text-4xl font-bold text-blue-700">$18,326</div>
          <div className="text-sm text-blue-600 mt-2">Development, infrastructure, legal, marketing</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
          <div className="text-sm font-semibold text-purple-600 mb-2">PRIZE FUND (YEAR 1)</div>
          <div className="text-4xl font-bold text-purple-700">$9,324</div>
          <div className="text-sm text-purple-600 mt-2">2 seasons × 7 draws × $666 per draw</div>
        </div>
        <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
          <div className="text-sm font-semibold text-green-600 mb-2">TOTAL COMMITMENT</div>
          <div className="text-4xl font-bold text-green-700">$27,650</div>
          <div className="text-sm text-green-600 mt-2">Combined Year 1 Sport Waikato commitment</div>
        </div>
      </div>

      {/* Year 1 Budget Breakdown Chart */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Year 1 App Budget Allocation</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={year1BudgetData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, amount }) => `${name}: $${amount.toLocaleString()}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {year1BudgetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {year1BudgetData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS[idx] }}></div>
                  <span className="font-semibold text-gray-900">{item.name}</span>
                </div>
                <span className="text-lg font-bold text-gray-900">${item.amount.toLocaleString()}</span>
              </div>
            ))}
            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900">Total App Budget</span>
                <span className="text-xl font-bold text-blue-600">
                  ${year1BudgetData.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prize Fund Structure */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Prize Fund Structure</h3>
        <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg mb-4">
          <p className="text-sm text-purple-800 mb-2">
            <strong>Legal Requirement:</strong> Prize fund is funded entirely from Sport Waikato operational funds,
            maintained separately from subscription revenue at the accounting level.
          </p>
          <p className="text-xs text-purple-700">
            This separation removes the "consideration for prize" element required for gambling classification under the Gambling Act 2003.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Draw</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Trigger Point</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Selection Basis</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Prize Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { draw: 1, trigger: 'Day 7 — Week 1 Survivor', basis: 'Highest verified activity minutes Days 1–7', value: 666 },
                { draw: 2, trigger: 'Day 13 — Friday the 13th', basis: 'Longest consecutive survival streak at midnight Day 13', value: 666 },
                { draw: 3, trigger: 'Day 14 — Fortnight Survivor', basis: 'Most 21+ minute sessions completed Days 8–14', value: 666 },
                { draw: 4, trigger: 'Day 21 — Three Week Warrior', basis: 'Highest total verified minutes over 3 weeks', value: 666 },
                { draw: 5, trigger: 'Day 24 — Redemption Day', basis: 'Most minutes on Redemption Day itself', value: 666 },
                { draw: 6, trigger: 'Day 28 — Final Week', basis: 'Highest minutes in final week (active survivors only)', value: 666 },
                { draw: 7, trigger: 'Day 30 — Season Finale', basis: 'Draw from survivors who completed all 30 days', value: 666 }
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">Draw {row.draw}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.trigger}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{row.basis}</td>
                  <td className="px-4 py-3 text-sm font-bold text-purple-600 text-right">${row.value}</td>
                </tr>
              ))}
              <tr className="bg-purple-50">
                <td colSpan={3} className="px-4 py-3 text-sm font-bold text-gray-900">Total Per Season</td>
                <td className="px-4 py-3 text-lg font-bold text-purple-700 text-right">$4,662</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Year 1 (2 seasons)</div>
            <div className="text-2xl font-bold text-gray-900">$9,324</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Annual (4 seasons)</div>
            <div className="text-2xl font-bold text-gray-900">$18,648</div>
          </div>
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <div className="text-sm text-green-700 mb-1">Sponsorship Opportunity</div>
            <div className="text-2xl font-bold text-green-700">$5K–$20K</div>
          </div>
        </div>
      </div>

      {/* Revenue Scenarios */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Year 1 Revenue Scenarios</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueScenarios}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="scenario" />
            <YAxis />
            <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
            <Legend />
            <Bar dataKey="revenue" name="Revenue" fill="#10B981" />
            <Bar dataKey="costs" name="Operating Costs" fill="#EF4444" />
            <Bar dataKey="prizeFund" name="Prize Fund" fill="#8B5CF6" />
            <Bar dataKey="net" name="Net Position" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Scenario</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Subscribers</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Revenue</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Costs</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Prize Fund</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Net Position</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {revenueScenarios.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">{row.scenario}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-right">{row.subscribers}</td>
                  <td className="px-4 py-3 text-sm text-green-600 text-right">${row.revenue.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-right">${row.costs.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-purple-600 text-right">${row.prizeFund.toLocaleString()}</td>
                  <td className={`px-4 py-3 text-sm font-bold text-right ${row.net >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                    ${row.net.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Three-Year Projection */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Three-Year Financial Projection (Base Case)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={threeYearProjection}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
            <Legend />
            <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#10B981" strokeWidth={3} />
            <Line type="monotone" dataKey="net" name="Net Position" stroke="#3B82F6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {threeYearProjection.map((year, idx) => (
            <div key={idx} className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm font-semibold text-gray-700 mb-2">{year.year}</div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subscribers:</span>
                  <span className="font-semibold text-gray-900">{year.subscribers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Revenue:</span>
                  <span className="font-semibold text-green-600">${year.revenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Net Position:</span>
                  <span className="font-bold text-blue-600">${year.net.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Break-Even Analysis:</strong> Including prize fund (annual commitment $18,648), break-even at
            191 average subscribers across the year. Base case projects 250 subscribers in Year 1.
          </p>
        </div>
      </div>

      {/* Ongoing Monthly Costs */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Ongoing Infrastructure Costs</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Service</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Purpose</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Monthly Cost (NZD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ongoingMonthly.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">{row.service}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.purpose}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">
                    ${row.cost.toLocaleString()}
                  </td>
                </tr>
              ))}
              <tr className="bg-blue-50 font-bold">
                <td colSpan={2} className="px-4 py-3 text-sm text-gray-900">Total Monthly Infrastructure</td>
                <td className="px-4 py-3 text-sm text-blue-700 text-right">
                  ${ongoingMonthly.reduce((sum, item) => sum + item.cost, 0).toLocaleString()}/month
                </td>
              </tr>
              <tr className="bg-blue-100 font-bold">
                <td colSpan={2} className="px-4 py-3 text-sm text-gray-900">Annual Infrastructure Total</td>
                <td className="px-4 py-3 text-sm text-blue-700 text-right">
                  ${(ongoingMonthly.reduce((sum, item) => sum + item.cost, 0) * 12).toLocaleString()}/year
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p>
            <strong>Note:</strong> Stripe payment processing charges 2.9% + $0.30 NZD per transaction.
            On a $13.00 subscription: ~$0.68 in fees, so net revenue per subscription = ~$12.32 NZD/month.
          </p>
        </div>
      </div>
    </div>
  );
}