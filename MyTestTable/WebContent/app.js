// init app

//jQuery.sap.log.setLevel(jQuery.sap.log.LogLevel['DEBUG']);


sap.ui.localResources("mytesttable");
var view = sap.ui.view({id:"vwDictList", viewName:"mytesttable.TableView", type:sap.ui.core.mvc.ViewType.JS});


var oShell;
var useShell = false;
if(useShell){
	oShell = new sap.ui.ux3.Shell("MainShell", {
		appTitle: "Демо-приложение для справочников"
	});
	oShell.setContent(view);
}else{
	oShell = new sap.ui.commons.layout.VerticalLayout("MainShell",{
		width: "70%"
	});
	oShell.addContent(view);
}
oShell.placeAt("content");




// common functions
function navigate(viewName, targetView, targetPlug, oEvent, oModel, oParams){
	//TODO: name of shell should be passed by parameter or set by   
	var oShell = sap.ui.getCore().byId("MainShell");
	var oView = sap.ui.getCore().byId(viewName);
	var oCtrl = null;
    //console.log("Navigate to: viewName = "+viewName+"; targetView = "+targetView+"; targetPlug = "+targetPlug);
    // instantiate the content view if it doesn't exist yet
	if (!oView) {
		//console.log("View not found. Initialize it.");
	    oView = sap.ui.view({
			type : sap.ui.core.mvc.ViewType.JS,
			id : viewName,
			viewName : targetView
	    });
	    
	    if(oModel){
	    	// bind it to the same model
		    oView.setModel(oModel);	    	
	    }
	}

	if(oView != null){
		oCtrl = oView.getController();
	}else{
		//console.error("View is NULL!");
	}
	if(oCtrl != null){
		// Navigate to the content view
		if(oParams){
			oCtrl[targetPlug](oEvent, oParams);
		}else{
			oCtrl[targetPlug](oEvent);
		}
	}	

	// show the view
	oShell.destroyContent();
	oShell.addContent(oView, true);				
	
	return oCtrl;
}


function myClone(obj){
	if(obj == null || typeof(obj) != 'object') {
		return obj;
	}
	var temp = {};
	for(var key in obj){
		temp[key] = myClone(obj[key]);
	}
	return temp;
}
