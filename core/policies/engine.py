from typing import List, Dict
import random

class TrafficPolicyEngine:
    """Enforces traffic management policies like rate limiting and retries."""
    
    def __init__(self):
        self.rate_limits = {}

    def is_allowed(self, service_id: str) -> bool:
        # Simple rate limit simulation
        limit = self.rate_limits.get(service_id, 100)
        return random.random() < 0.95 # 95% success rate simulation

class MeshSecurityModel:
    """Handles mTLS certificate simulation and identity trust."""
    
    def __init__(self, trust_domain: str = "cluster.local"):
        self.trust_domain = trust_domain

    def generate_spiffe_id(self, service_name: str, namespace: str) -> str:
        return f"spiffe://{self.trust_domain}/ns/{namespace}/sa/{service_name}"

class FaultInjectionLogic:
    """Configures failure scenarios for resilience testing."""
    
    def inject_delay(self, probability: float, delay_ms: int):
        return {"type": "delay", "probability": probability, "delay_ms": delay_ms}

    def inject_abort(self, probability: float, http_status: int):
        return {"type": "abort", "probability": probability, "status": http_status}
