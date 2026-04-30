from fastapi import APIRouter, Body
router = APIRouter()
@router.post('/split')
def split_traffic(data: dict = Body(...)):
    return {'status': 'POLICY_APPLIED', 'split': data.get('split')}
