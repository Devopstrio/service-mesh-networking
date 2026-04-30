from fastapi import APIRouter, Body
router = APIRouter()
@router.get('/')
def list_services():
    return {'services': [{'id': 'order-svc.cluster-1.svc.cluster.local', 'name': 'order-svc', 'cluster': 'cluster-1', 'mtls': True}]}
@router.post('/register')
def register_service(data: dict = Body(...)):
    return {'status': 'REGISTERED', 'service_id': 'mock-id'}
