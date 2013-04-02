sap.ui.controller("mytesttable.TableElemView", {


/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
*/
   onInit: function() {
   },

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
*/
//   onBeforeRendering: function() {
//
//   },

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
*/
//   onAfterRendering: function() {
//
//   },

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
*/
//   onExit: function() {
//
//   }
	
	inBound: function(oEvent, oParams){
		var sId = null;
		var oCore = sap.ui.getCore();
		var oModel = oCore.getModel("MyModel");
		
		var oDictData = null;
		if(oParams){
			sId = oParams.id;
			// читаем данные для выбранной строки
			oDictData = this.readData(sId);
		}else{
			// в WDJ мы бы создавали новую bean-модель и биндили ее на ноду. Здесь - своего рода аналог.
			oDictData = new DAO().createModel();
		}
		// Биндим данные на модель для формы ввода
		oModel.setProperty("/dictData", oDictData);
	},
	
	onBackBtnPressed: function(oEvent){
		navigate("vwDictList", "mytesttable.TableView", "inBound", null, null);
	},
   
   
	onSaveBtnPressed: function(oEvent){
		var oCore = sap.ui.getCore();
		// значение из поля ввода уже "сидит" в модели
		var oModel = oCore.getModel("MyModel");
		var oDict = oModel.getProperty("/dictData");
		
		this.saveData(oDict);
		navigate("vwDictList", "mytesttable.TableView", "inBound", null, null);
	},
	
	
	saveData: function(oData){
		var oDao = new DAO();
		oDao.save(oData, oData.id);
	},
	
	
	//TODO: нужны общие контроллеры!
	readData: function(sId) {
		var oDao = new DAO();
		return oDao.read(sId);
	}

});