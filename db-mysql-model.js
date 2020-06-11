let _ = require('underscore')._;
let Backbone = require('backbone');
let mysql = require('mysql');

let createConnection  = function () {
	
    // Uses node-mysql to establish connection with database
	/*let pool = mysql.createPool({
        host: 'localhost', // localhost
        user: 'root',//'root',
        password: '',//
        database: 'comparie',//realmark
        connectionLimit : 1000,
        connectTimeout  : 60 * 60 * 1000,
        aquireTimeout   : 60 * 60 * 1000,
        timeout         : 60 * 60 * 1000,
	});*/
	
	let pool = mysql.createPool({
        host: 'mysql669.umbler.com', // localhost
        user: 'comparie',//'root',
        password: 'flavio25879',//
        database: 'comparie',//realmark
        connectionLimit : 1000,
        connectTimeout  : 60 * 60 * 3000,
        aquireTimeout   : 60 * 60 * 3000,
        timeout         : 60 * 60 * 3000,
    });
    
    let connection = null;
    
	// Main model
	let SQLModel = Backbone.Model.extend({
        
		// Function instead of set, removes functions passed back in results by node-mysql
		setSQL: function(sql) {
			for (var key in sql) {
				if (typeof(sql[key]) != "function") {
					this.set(key, sql[key]);
				}
			};
		},
        
		// Function for creating custom queries
		query: function(query, callback) {
            pool.getConnection(function(err, connection){
                if(err) throw err;
                connection.query(query, function(err, result, fields) {
                    if(callback){
                        callback(err, result, fields);
                    }
                });
                connection.release();//release the connection
            });
		},		
		// Function returning one set of results and setting it to model it was used on
		read: function(id, callback) {
			root=this;
			if(this.tableName) var tableName = this.tableName;
			else var tableName = this.attributes.tableName;
			if(!id) {
				id=this.attributes.id;
			} else if (typeof(id) == "function") {
				callback=id;
				id=this.attributes.id;
			} 
			var q = "SELECT * FROM "+tableName+" WHERE id="+id;
            pool.getConnection(function(err, connection){
                if(err) throw err;
                connection.query(q, root, function(err, result, fields) {
                    root.setSQL(result[0]);
                    if(callback){
                        callback(err, result[0], fields);
                    }
                });
                connection.release();//release the connection
            });
		},	
		// Function with set of methods to return records from database
		find: function(method, conditions, callback) {
			if (typeof(method) == "function") {
				callback=method;
				method='all';
				conditions={};
			} else if (typeof(conditions) == "function") {
				callback=conditions;
				conditions={};
			}
			if(this.tableName) var tableName = this.tableName;
			else var tableName = this.attributes.tableName;
			// building query conditions
			var qcond='';
			var fields='*';
			if(conditions['fields']) {
				fields=conditions['fields'];
			}		
			if(conditions['where']) {
				qcond+=" WHERE "+conditions['where'];
			}		
			if(conditions['group']) {
				qcond+=" GROUP BY "+conditions['group'];
				if(conditions['groupDESC']) {
				qcond+=" DESC";
				}
			}		
			if(conditions['having']) {
				qcond+=" HAVING "+conditions['having'];
			}		
			if(conditions['order']) {
				qcond+=" ORDER BY "+conditions['order'];
				if(conditions['orderDESC']) {
					qcond+=" DESC";
				}
			}		
			if(conditions['limit']) {
				qcond+=" LIMIT "+conditions['limit'];
			}		

			switch (method) {
				// default method
				case 'all': 
					var q = "SELECT "+fields+" FROM "+tableName+qcond;
					console.log(q);
                    pool.getConnection(function(err, connection){
                        if(err) throw err;
                        connection.query(q, function(err, result, fields) {
                            if(callback){
                                callback(err, result, fields);
                            }
                        });
                        connection.release();//release the connection
                    });
					break;
				// method returning value of COUNT(*)
				case 'count':
					var q = "SELECT COUNT(*) FROM "+tableName+qcond;
                    pool.getConnection(function(err, connection){
                        if(err) throw err;
                        connection.query(q, function(err, result, fields) {
                            if(callback){
                                callback(err, result[0]['COUNT(*)'], fields);
                            }
                        });
                        connection.release();//release the connection
                    });
					break;		
				// method returning only first result (to use when you expect only one result)				
				case 'first':
					var q = "SELECT "+fields+" FROM "+tableName+qcond;
                    pool.getConnection(function(err, connection){
                        if(err) throw err;
                        connection.query(q, function(err, result, fields) {
                            if(callback){
                                callback(err, result[0], fields);
                            }
                        });
                        connection.release();//release the connection
                    });
					break;
				// method returning only value of one field (if specified in 'fields') form first result 
				case 'field':
					var q = "SELECT "+fields+" FROM "+tableName+qcond;
                    pool.getConnection(function(err, connection){
                        if(err) throw err;
                        connection.query(q, function(err, result, fields) {
                            for (var key in result[0]) break;
                            if(callback){
                                callback(err, result[0][key], fields);
                            }
                        });
                        connection.release();//release the connection
                    });
					break;
			}
		},
		// Function saving your model attributes
		save: function(where, callback) {
			if (typeof(where) == "function") {
				callback=where;
				where=null;
			}
			if(this.tableName) var tableName = this.tableName;
			else var tableName = this.attributes.tableName;
			if(where) {
				var id = null;
				if(this.has('id')) {
					id = this.get('id');
					delete this.attributes.id;
				}
				var q = "UPDATE "+tableName+" SET "+ connection.escape(this.attributes)+" WHERE "+where;
				if(id) {
					this.set('id', id);
				}
				var check = "SELECT * FROM "+tableName+" WHERE "+where;
                pool.getConnection(function(err, connection){
                    if(err) throw err;
                    connection.query(check, function(err, result, fields) {
                        if(result[0]){
                            connection.query(q, function(err, result) {
                                if(callback){
                                    callback(err, result);
                                }
                            });	
                        } else {
                            err="ERROR: Record not found";
                            callback(err, result);
                        }
                    });
                    connection.release();//release the connection
                });
				
			} else {
				if(this.has('id')) {
					var id = this.get('id');
					delete this.attributes.id;
					var q = "UPDATE "+tableName+" SET "+ connection.escape(this.attributes)+" WHERE id="+connection.escape(id);
					this.set('id', id);
					var check = "SELECT * FROM "+tableName+" WHERE id="+connection.escape(id);
                    pool.getConnection(function(err, connection){
                        if(err) throw err;
                        connection.query(check, function(err, result, fields) {
                            if(result[0]){
                                connection.query(q, function(err, result) {
                                    if(callback){
                                        callback(err, result);
                                    }
                                });	
                            } else {
                                err="ERROR: Record not found";
                                callback(err, result);
                            }
                        });
                        connection.release();//release the connection
                    });
				} else {
					// Create new record
					var q = "INSERT INTO "+tableName+" SET "+ connection.escape(this.attributes);
                    pool.getConnection(function(err, connection){
                        if(err) throw err;
                        connection.query(q, function(err, result) {
                            if(callback){
                                callback(err, result);
                            }
                        });
                        connection.release();//release the connection
                    });
				}
			}
		},
		// Function for removing records
		remove: function(where, callback) {
			if (typeof(where) == "function") {
				callback=where;
				where=null;
			}
			if(this.tableName) var tableName = this.tableName;
			else var tableName = this.attributes.tableName;
			if(where) {
				var q = "DELETE FROM "+tableName+" WHERE "+where;
				var check = "SELECT * FROM "+tableName+" WHERE "+where;
                pool.getConnection(function(err, connection){
                    if(err) throw err;
                    connection.query(check, function(err, result, fields) {
                        if(result[0]){
                            connection.query(q, function(err, result) {
                                if(callback){
                                    callback(err, result);
                                }
                            });	
                        } else {
                            err="ERROR: Record not found";
                            callback(err, result);
                        }
                    });
                    connection.release();//release the connection
                });
			} else {
				if(this.has('id')) {
					var q = "DELETE FROM "+tableName+" WHERE id="+connection.escape(this.attributes.id);
					var check = "SELECT * FROM "+tableName+" WHERE id="+connection.escape(this.attributes.id);
					this.clear();
                    pool.getConnection(function(err, connection){
                        if(err) throw err;
                        connection.query(check, function(err, result, fields) {
                            if(result[0]){
                                connection.query(q, function(err, result) {
                                    if(callback){
                                        callback(err, result);
                                    }
                                });	
                            } else {
                                err="ERROR: Record not found";
                                callback(err, result);
                            }
                        });
                        connection.release();//release the connection
                    });
				} else {
					err="ERROR: Model has no specified ID, delete aborted"; 
					if(callback){
						callback(err, result);
					}
				}
			}	
		},
	});
	return SQLModel;
}
exports.createConnection = createConnection;