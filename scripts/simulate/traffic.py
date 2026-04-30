import sys
import time
from core.mesh.engine import MeshControlPlane, MeshDataPlane

def run_mesh_simulation():
    # 1. Initialize Control Plane
    cp = MeshControlPlane()
    
    print("--- Service Mesh Traffic Simulation ---")
    
    # 2. Register Services
    s1 = cp.register_service("order-svc", "cluster-1", "10.0.0.1")
    s2 = cp.register_service("payment-svc", "cluster-1", "10.0.0.2")
    s3 = cp.register_service("inventory-svc", "cluster-2", "10.1.0.5") # Cross-cluster
    
    print(f"Registered {len(cp.service_registry)} services in the mesh.")
    
    # 3. Apply Traffic Split (Canary)
    cp.set_traffic_policy(s2, {
        "split": {"v1": 0.5, "v2": 0.5},
        "fault": {"probability": 0.2, "delay_ms": 1000}
    })
    
    # 4. Proxy Interaction
    proxy = MeshDataPlane(s1, cp)
    
    print(f"\n[START] Simulating 10 requests from {s1} to {s2}...")
    for i in range(10):
        resp = proxy.handle_request(s2, {"txn_id": i})
        status_marker = "✅" if resp['status'] == "SUCCESS" else "❌"
        print(f"  Req {i+1}: {status_marker} Latency: {resp['latency_ms']}ms | Target: {resp['target']}")
        time.sleep(0.1)

if __name__ == "__main__":
    run_mesh_simulation()
