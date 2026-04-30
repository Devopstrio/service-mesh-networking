import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { 
  Network, 
  Share2, 
  Lock, 
  Activity,
  ArrowUpRight,
  TrendingDown,
  Clock,
  History,
  Layers,
  Database,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const trafficData = [
  { name: '00:00', requests: 1200, latency: 42 },
  { name: '04:00', requests: 800, latency: 38 },
  { name: '08:00', requests: 2500, latency: 55 },
  { name: '12:00', requests: 3800, latency: 62 },
  { name: '16:00', requests: 3200, latency: 58 },
  { name: '20:00', requests: 2100, latency: 45 },
];

const KPI_CARDS = [
  { title: 'Total Services', value: '142', trend: '+12%', color: 'teal', icon: Share2 },
  { title: 'mTLS Coverage', value: '100%', trend: 'Secured', color: 'teal', icon: Lock },
  { title: 'Avg Latency (P99)', value: '62ms', trend: 'Stable', color: 'teal', icon: Clock },
  { title: 'Fault Tolerance', value: '99.99%', trend: 'Resilient', color: 'slate', icon: Activity },
];

const MeshDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Mesh Intelligence Hub</h1>
          <p className="text-slate-400">Strategic oversight of global service communication and zero-trust policy.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Export Mesh Config
          </button>
          <button className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Apply Traffic Split
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-${card.color}-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-${card.color}-400`} />
              </div>
              <div className={`text-xs font-medium ${card.trend.includes('+') || card.trend === 'Secured' ? 'text-teal-400' : 'text-slate-400'}`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Throughput Graph */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Mesh Traffic Throughput (24h)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="requests" stroke="#14b8a6" fill="url(#colorRequests)" name="Req/Sec" />
                <Area type="monotone" dataKey="latency" stroke="#fbbf24" fill="transparent" strokeDasharray="5 5" name="Latency (ms)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Distribution */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Global Cluster Distribution</h3>
          <div className="flex-1 space-y-6">
            {[
              { name: 'Cluster-Primary (AWS)', value: 65, color: 'bg-teal-500' },
              { name: 'Cluster-Secondary (Azure)', value: 25, color: 'bg-blue-500' },
              { name: 'Cluster-Edge (GCP)', value: 10, color: 'bg-slate-500' },
            ].map((cluster) => (
              <div key={cluster.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">{cluster.name}</span>
                  <span className="text-slate-400">{cluster.value}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${cluster.color}`} style={{ width: `${cluster.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Registered Mesh Services</h3>
          <button className="text-teal-400 hover:text-teal-300 text-sm font-medium">View Global Graph</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Service Name</th>
                <th className="px-6 py-4 font-semibold">Cluster</th>
                <th className="px-6 py-4 font-semibold">Version</th>
                <th className="px-6 py-4 font-semibold">mTLS</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { name: 'order-svc', cluster: 'cluster-1', version: 'v1.2.0', mtls: 'ENFORCED', status: 'HEALTHY' },
                { name: 'payment-svc', cluster: 'cluster-1', version: 'v1.1.0', mtls: 'ENFORCED', status: 'HEALTHY' },
                { name: 'inventory-svc', cluster: 'cluster-2', version: 'v2.0.1', mtls: 'PERMISSIVE', status: 'WARM' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Cpu className="w-4 h-4 text-teal-400" />
                      <span className="text-sm font-medium text-slate-300">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">{row.cluster}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{row.version}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Lock className={`w-3 h-3 ${row.mtls === 'ENFORCED' ? 'text-teal-400' : 'text-slate-500'}`} />
                      <span className="text-xs text-slate-400">{row.mtls}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${
                      row.status === 'HEALTHY' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' : 
                      'text-amber-400 border-amber-500/20 bg-amber-500/10'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-teal-400 hover:text-teal-300 text-xs font-bold uppercase tracking-wider">
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MeshDashboard;
