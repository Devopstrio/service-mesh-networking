import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MeshDashboard from './pages/MeshDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400">The service mesh control plane is currently propagating configurations and verifying mTLS certificates. This module will be available shortly.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<MeshDashboard />} />
          <Route path="/services" element={<Placeholder name="Global Service Registry" />} />
          <Route path="/traffic" element={<Placeholder name="Traffic Management (Canary/Split)" />} />
          <Route path="/security" element={<Placeholder name="Zero Trust & mTLS Center" />} />
          <Route path="/observability" element={<Placeholder name="Distributed Tracing & Telemetry" />} />
          <Route path="/policies" element={<Placeholder name="Mesh Policy Enforcement" />} />
          <Route path="/config" element={<Placeholder name="Control Plane Config (XDS)" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
