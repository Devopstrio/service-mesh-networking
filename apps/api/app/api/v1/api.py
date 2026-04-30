from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, services, traffic, policies, dashboard
)

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(services.router, prefix="/services", tags=["services"])
api_router.include_router(traffic.router, prefix="/traffic", tags=["traffic"])
api_router.include_router(policies.router, prefix="/policy", tags=["policies"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
