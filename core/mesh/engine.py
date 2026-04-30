import uuid
import random
import time
from typing import List, Dict, Any, Optional
from datetime import datetime

class MeshControlPlane:
    """Simulates a service mesh control plane (e.g., Istiod)."""
    
    def __init__(self):
        self.service_registry = {}
        self.traffic_policies = {}

    def register_service(self, name: str, cluster: str, ip: str, version: str = "v1"):
        service_id = f"{name}.{cluster}.svc.cluster.local"
        self.service_registry[service_id] = {
            "name": name,
            "cluster": cluster,
            "ip": ip,
            "version": version,
            "status": "HEALTHY",
            "mtls": True
        }
        return service_id

    def set_traffic_policy(self, service_id: str, policy: Dict[str, Any]):
        self.traffic_policies[service_id] = policy
        return policy

class MeshDataPlane:
    """Simulates a service mesh sidecar proxy (e.g., Envoy)."""
    
    def __init__(self, service_id: str, control_plane: MeshControlPlane):
        self.service_id = service_id
        self.cp = control_plane
        self.metrics = []

    def handle_request(self, target_service_id: str, request_data: Dict[str, Any]) -> Dict[str, Any]:
        start_time = time.time()
        
        # 1. mTLS Simulation
        if not self.cp.service_registry.get(target_service_id, {}).get("mtls"):
            return {"status": "ERROR", "message": "mTLS Handshake Failed"}
        
        # 2. Traffic Policy & Splitting
        policy = self.cp.traffic_policies.get(target_service_id, {})
        if "split" in policy:
            # Simulate canary split
            roll = random.random()
            version = "v1"
            if roll < policy["split"].get("v2", 0):
                version = "v2"
        
        # 3. Latency Injection (Fault Injection)
        latency = 0
        if "fault" in policy and random.random() < policy["fault"].get("probability", 0):
            latency = policy["fault"].get("delay_ms", 0) / 1000
            time.sleep(latency)
        
        # 4. Success Simulation
        success = True
        if "abort" in policy and random.random() < policy["abort"].get("probability", 0):
            success = False
        
        end_time = time.time()
        duration_ms = (end_time - start_time) * 1000
        
        res = {
            "request_id": str(uuid.uuid4()),
            "source": self.service_id,
            "target": target_service_id,
            "latency_ms": round(duration_ms, 2),
            "status": "SUCCESS" if success else "FAILED",
            "timestamp": datetime.utcnow().isoformat()
        }
        
        self.metrics.append(res)
        return res

class MeshObservability:
    """Aggregates metrics and traces from the simulated mesh."""
    
    def __init__(self):
        self.traces = []

    def record_trace(self, trace_data: Dict[str, Any]):
        self.traces.append(trace_data)

if __name__ == "__main__":
    # Simulation
    cp = MeshControlPlane()
    
    # Register Services
    s1 = cp.register_service("order-svc", "cluster-1", "10.0.0.1")
    s2 = cp.register_service("payment-svc", "cluster-1", "10.0.0.2")
    
    # Set Traffic Split Policy (Canary)
    cp.set_traffic_policy(s2, {
        "split": {"v1": 0.8, "v2": 0.2},
        "fault": {"probability": 0.1, "delay_ms": 500}
    })
    
    # Proxy Simulation
    proxy = MeshDataPlane(s1, cp)
    
    print(f"--- Service Mesh Traffic Simulation ---")
    for _ in range(5):
        resp = proxy.handle_request(s2, {"amount": 100})
        print(f"[{resp['timestamp']}] {resp['source']} -> {resp['target']} | Latency: {resp['latency_ms']}ms | Status: {resp['status']}")
