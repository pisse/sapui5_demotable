sap.ui.controller("mytesttable.TableView", {


/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
*/
   onInit: function() {
	   var oCore = sap.ui.getCore();
	   this.refreshData();
	   var oModel = this.getMyModel();
	   // т.к. onInit() вызывается всегда, то этот биндинг должен выполняться всегда
	   // во View его сделать не получается, т.к. метод из вьюхи выполняется раньше, чем этот метод
	   var oTable = oCore.getElementById("DictsTable");
	   oTable.setModel(oModel);
	   oTable.bindRows("/modelData");
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
   
   
   onBtnEditPressed: function(oEvent){
	   // Если эту функцию прикреплять напрямую в качестве обработчика события к кнопке (press: oController.onBtnEditPressed),
	   // то тогда this будет содержать в себе объект кнопки, а не контроллер!
	   // А если сделать так, как сейчас, то в this будет этот контроллер, что нам и надо.
	   
	   //this.clearMsgBar();
	   var oCore = sap.ui.getCore();
	   var oTable = oCore.getElementById("DictsTable");
	   var idx = oTable.getSelectedIndex();
	   if( idx != -1){
		   var iId = this.getIdOfSelectedRec(idx);
		   var oModel = this.getMyModel();
		   var oParams = {"id": iId};
		   navigate("vwDictDetails", "mytesttable.TableElemView", "inBound", oEvent, oModel, oParams);
	   }else{
		   var msgs = new Array();
		   var now = (new Date()).toUTCString();
		   var oMsg = new sap.ui.core.Message({
			   type : sap.ui.core.MessageType.Error, // sap.ui.commons.MessageType
			   text : "Необходимо выбрать элемент для изменения!",
			   timestamp : now
		   });
		   msgs.push(oMsg);
		   
//		   var oNotifier = new sap.ui.ux3.Notifier({
//				title : "The My first Notifier"
//			});
//			oNotifier.addMessage(oMsg);

		   
//		   var oNBar = oCore.getElementById("NotifBar");
//		   oNBar.setMessageNotifier(oNotifier);
//		   oNBar.attachDisplay(
//				   function(oEvent){
//					   var bShow = oEvent.getParameter("show");
//					   var sStatus = sap.ui.ux3.NotificationBarStatus.None;
//					   if (bShow) {
//						   sStatus = sap.ui.ux3.NotificationBarStatus.Default;
//					   }
//					   this.setVisibleStatus(sStatus);
//				   }
//		   );
//		   oNBar.setVisibleStatus(sap.ui.ux3.NotificationBarStatus.Default);
//		   var oMBar = oCore.getElementById("MessageBar");
//		   oMBar.addMessages(msgs);
	   }
   },
   
   
   disp2: function(oEvent){
	   //console.error("Hi! I'm a displayListener.");
	   //var bShow = oEvent.getParameter("show");
	   //console.error(" >> bShow = "+bShow);
   },
   
   
   onBtnCreatePressed: function(oEvent){
	   var oCore = sap.ui.getCore();
	   var oModel = oCore.getModel("MyModel");
	   navigate("vwDictDetails", "mytesttable.TableElemView", "inBound", oEvent, oModel);
   },
   
   
   
   onAskToDelete: function(oEvent){
	   //console.error("Enter to onAskToDelete");
	   this.printMe();
	   var oCtrl = this;
	   sap.ui.commons.MessageBox.confirm("Удалить выделенный элемент?", function(bResult) { oCtrl.onDelete(bResult); }, "Запрос подтверждения");
   },
   
   
   onDelete: function(bResult){
 	  //console.log("enter in onDelete");
	  //console.log("Result returned to fnCallbackConfirm: " + bResult);
	  if(bResult){
		  this.clearMsgBar();
		  this.printMe();
		  var oCore = sap.ui.getCore();
		  var oTable = oCore.getElementById("DictsTable");
		  var idx = oTable.getSelectedIndex();
		  //console.error("Selected index = "+idx);
		  if(idx != -1){
			  var iId = this.getIdOfSelectedRec(idx);
			  new DAO().deleteRec(iId);
			  this.refreshData();
		  }else{
			  var msgs = new Array();
			  var oMsg = new sap.ui.commons.Message({
				  //id : "MsgId", // sap.ui.core.ID
				  type : sap.ui.commons.MessageType.Error, // sap.ui.commons.MessageType
				  text : "Необходимо выбрать элемент для удаления!"
			  });
			  msgs.push(oMsg);
//			  var oMBar = sap.ui.getCore().getElementById("MessageBar");
//			  oMBar.addMessages(msgs);
		  }
	  }
	  //console.log("leave onDelete");
   },
   
   
   
   clearMsgBar: function(){
//	   var oMBar = sap.ui.getCore().getElementById("MessageBar");
//	   oMBar.deleteAllMessages();
   },
   
   
   printMe: function(){
	   //console.error("Hi! this is "+this);
   },
   
   
   inBound: function(oEvent){
	   // здесь обновление данных не нужно, поскольку оно происходит в методе onInit(), который вызывается перед вызовом этого метода
   },
   
   
   getIdOfSelectedRec: function(idx){
	   var oModel = this.getMyModel();
	   // здесь мы получаем объект для текущей строки
	   // имя свойства, которое мы указывали в методе onInit()
	   var oDicts = oModel.getProperty("/modelData");
	   var iId = oDicts[idx].id;
	   return iId;
   },
   
   
   refreshData: function(){
	   //console.log("Begin refresh data...");
	   var oCore = sap.ui.getCore();
	   var aData = this.readData(null);
	   var oModel = this.getMyModel();
	   if(oModel == null){
		   // этот блок выполняется только при старте приложения,
		   // если, конечно, эта модель где-то в приложении не будет ВНЕЗАПНО удалена
		   //console.log("Init MyModel!");
		   oModel = new sap.ui.model.json.JSONModel();
	   }
	   oModel.setProperty("/modelData", aData);
	   oCore.setModel(oModel, "MyModel");
	   console.log("End refresh data.");
   },
   
   
   
   getMyModel: function(){
	   var oCore = sap.ui.getCore();
	   // мы дали название модели - MyModel в методе onInit()
	   //TODO: имена моделей лучше сделать константами
	   return oCore.getModel("MyModel");
   },
   
   
   readData: function(sId) {
	   var oDao = new DAO();
	   return oDao.read(sId);
   }

});