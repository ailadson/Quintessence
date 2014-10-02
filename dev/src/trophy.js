Ether.Trophy = function(){
	this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	this.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
	this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
	this.db;
	this.newEther;

	if (!this.indexedDB) {
    	window.alert("Your browser doesn't support IndexedDB. Please update to get the most out of this game.");
	}
}

Ether.Trophy.prototype.extractEtherInfo = function(ether){
	var body = {};
	body.elements = ether.elements;
	body.coreElements = ether.coreElements;
	return body;
}

Ether.Trophy.prototype.init = function(){
	var request = this.indexedDB.open("PastEther",1);

	request.onerror = function(event) {
	  alert("Why didn't you allow my web app to use IndexedDB?!");
	};

	request.onsuccess = function(event) {
		this.db = request.result;
		
		 var transaction = db.transaction()

		console.log(this.db.transaction.objectStore);
		console.log(this.db.transaction.objectStore("ether"));

		if(!this.db.transaction.objectStore("ether")){
			console.log("inside if statement");
			console.log(this.db.createObjectStore);
			var objectStore = this.db.createObjectStore("ether",{ autoIncrement : true });
			console.log("object store made")
			objectStore.createIndex("elements","elements");
			objectStore.createIndex("coreElements","coreElements");
			console.log("index created")
	  	}
	  	console.log('end on request success')
	};
}

Ether.Trophy.prototype.save = function(ether){
	console.log("in save")
	var body = this.extractEtherInfo(ether);
	var etherObjectStore = db.transaction("Ether","readwrite").objectStore("Ether");
	etherObjectStore.add(body);
	console.log(etherObjectStore);
}