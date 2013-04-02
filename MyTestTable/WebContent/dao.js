function DAO(){
}

DAO.prototype.data = [
          			{id: 1, name: "Столовая", checked: false, count: 15},
    				{id: 2, name: "Транспортный отдел", checked: false, count: 25},
    				{id: 3, name: "Хозблок", checked: false, count: 18},
    				{id: 4, name: "IT", checked: false, count: 20},
    				{id: 5, name: "Ремонтная бригада", checked: false, count: 23},
    				{id: 6, name: "Цех 4", checked: false, count: 35},
    				{id: 7, name: "Управление", checked: false, count: 5},
    				{id: 8, name: "Цех 5", checked: false, count: 28},
    				{id: 9, name: "Бухгалтерия", checked: false, count: 7},
    				{id: 10, name: "Цех 1", checked: false, count: 26},
    				{id: 11, name: "Цех 2", checked: false, count: 22},
    				{id: 12, name: "Цех 3", checked: false, count: 13},
    				{id: 13, name: "Служба безопасности", checked: false, count: 29},
    				{id: 14, name: "Отдел рекламы", checked: false, count: 14},
    				{id: 15, name: "Склад", checked: false, count: 23},
    				{id: 16, name: "Охрана", checked: false, count: 11},
    				{id: 17, name: "Секретариат", checked: false, count: 5},
    				{id: 18, name: "Отдел контроля", checked: false, count: 13},
    				{id: 19, name: "Кадровая служба", checked: false, count: 10},
    				{id: 20, name: "Цех 6", checked: false, count: 19}
    			];


DAO.prototype.save = function(oDictData, bIsEdit){
	var sDictId = oDictData.id;
	if(bIsEdit){
		var i = this.getRecNumberById(sDictId);
		if(i != -1){
			this.data[i] = oDictData;
		}
	}else{
		oDictData.id = this.createId();
		this.data.push(oDictData);
	}
},


DAO.prototype.deleteRec = function(iId){
	var i = this.getRecNumberById(iId);
	if(i != -1){
		this.data.splice(i, 1);
	}
},


DAO.prototype.createModel = function(){
	var oData = {id: 0, name: "", checked: false, count: 0};
	return oData;
},


DAO.prototype.read = function(sId){
	if(sId == null){
		return this.data;
	}else{
		var oRec = this.findById(sId);
		return myClone(oRec);
	}
},


DAO.prototype.findById = function(sId){
	if(sId == null || !this.data){
		return null;
	}
	for ( var i = 0; i < this.data.length; i++) {
		var oRec = this.data[i];
		if(sId.toString() == oRec.id.toString()){
			return oRec;
		}
	}
	return null;
},


DAO.prototype.getRecNumberById = function(sId){
	if(sId == null || !this.data ){
		return -1;
	}
	for ( var i = 0; i < this.data.length; i++) {
		var oRec = this.data[i];
		if(sId.toString() == oRec.id.toString()){
			return i;
		}
	}
	return -1;
},


DAO.prototype.createId = function(){
	var maxId = -1;
	for ( var i = 0; i < this.data.length; i++) {
		var oRec = this.data[i];
		if(maxId < oRec.id){
			maxId = oRec.id;
		}
	}
	if(maxId == -1){
		maxId = 0;
	}
	return ++maxId;
}

;