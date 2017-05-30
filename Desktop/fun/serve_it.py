import pymongo
import bottle
from bson.json_util import dumps

# mLab credentials
db_info = {}
db_info['name'] = 'cms'
db_info['host'] = 'ds155841.mlab.com'
db_info['port'] = 55841
db_info['user'] = 'jb'
db_info['pw'] = 'jb'

# connect
connection = pymongo.MongoClient(db_info['host'], db_info['port'])
db = connection['cms']
db.authenticate(db_info['user'], db_info['pw'])
gi = db.gen_info

# create routes
# single
@bottle.route('/gen_info/hospital/<provider_id>')
def grab_record(provider_id):
	bottle.response.headers['Access-Control-Allow-Origin'] = '*' # <- needed to allow request from D3
	results = gi.find({'provider_id':int(provider_id)}, {'_id':False})
	return dumps(results)

# aggregate
@bottle.route('/gen_info/aggregate')
def state_counts():
	bottle.response.headers['Access-Control-Allow-Origin'] = '*' # <- needed to allow request from D3
	results = gi.aggregate([
		{"$group" :{"_id":"$location_state","count":{"$sum":1}}}])
	return dumps(results)

bottle.run(host='localhost', port=8080, debug=True)
