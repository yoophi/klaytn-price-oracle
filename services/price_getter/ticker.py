import requests
import json
from urllib.parse import urlencode
import redis
from loguru import logger

redis_host = '127.0.0.1'
redis_db = 0
redis_port = 6379

r = redis.StrictRedis(host=redis_host, port=redis_port, db=redis_db)

for currency in ('KLAY', 'ETH', 'BTC'):
    qs = dict(currency=currency)
    endpoint = 'https://api.coinone.co.kr/ticker/'

    resp = requests.get(f'{endpoint}?{urlencode(qs)}')
    logger.info(f'{currency} {resp.status_code}')
    r.publish('PRICE_UPDATE', json.dumps(dict(currency=currency, last=resp.json().get('last'))))

