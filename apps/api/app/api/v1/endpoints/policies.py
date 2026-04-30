from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_policies():
    return {'status': 'ok', 'component': 'policies'}
