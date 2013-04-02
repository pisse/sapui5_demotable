sap.ui.jsview("mytesttable.TableElemView", {

      getControllerName : function() {
         return "mytesttable.TableElemView";
      },

      createContent : function(oController) {
    	  //TODO: продумать методы для получения модели в любой из вьюх
    	  var oCore = sap.ui.getCore();
    	  var oModel = oCore.getModel("MyModel");
    	  var oView = this;
    	  
    	  
    	  var oPanel = new sap.ui.commons.Panel( "DictDetails", { width: "500px", showCollapseIcon:false} );
    	  oPanel.setTitle(new sap.ui.commons.Title({text: "Данные по отделу:"}));
    	  oPanel.setAreaDesign( sap.ui.commons.enums.AreaDesign.Plain );
    	  oPanel.setBorderDesign( sap.ui.commons.enums.BorderDesign.Box );

    	  var oMatrix = new sap.ui.commons.layout.MatrixLayout({layoutFixed: true, columns: 2});
    	  //oMatrix.setWidths('100px', '200px');

    	  
    	  var oInput = new sap.ui.commons.TextField("inputDictName", {
    		  value: "{/dictData/name}"
    		, required: true
    		, tooltip: new sap.ui.commons.RichTooltip( {title: "Информация", text:"Введите в это поле название отдела"})
    		, width: "200px"
    		, change : function(){
    			// здесь this является inputField'ом, к которому прикрепили эту функцию
    			this.setValueState( 
    					this.getValue() == "" ? sap.ui.core.ValueState.Error : sap.ui.core.ValueState.None
    				);
    			}
    	  });

    	  oInput.setModel(oModel);
    	  //oInput.setTooltip("Введите название отдела");
    	  
    	  var oLabel = new sap.ui.commons.Label("inputDictName_label", {textAlign: sap.ui.core.TextAlign.Right, design: sap.ui.commons.LabelDesign.Bold});
    	  oLabel.setText("Название отдела:");
    	  oLabel.setLabelFor(oInput);
    	  oMatrix.createRow(new sap.ui.commons.layout.MatrixLayoutCell(
				{
					backgroundDesign : sap.ui.commons.layout.BackgroundDesign.Transparent, // sap.ui.commons.layout.BackgroundDesign
					hAlign : sap.ui.commons.layout.HAlign.Right, // sap.ui.commons.layout.HAlign
					content : [oLabel]
				}), oInput);
    	  
    	  
    	  oInput = new sap.ui.commons.TextField("inputDictCount", {
    		  value: { path: "/dictData/count", type: new sap.ui.model.type.Integer() }
		  	, tooltip: new sap.ui.commons.RichTooltip( "TextRtt1", {text:"Введите в это поле количество сотрудников отдела"})
    		, required: true
    		, width: "50px"
    		, change : function(){
    			// здесь this является inputField'ом, к которому прикрепили эту функцию
    			this.setValueState( 
    					this.getValue() < 0 ? sap.ui.core.ValueState.Error : sap.ui.core.ValueState.None
    				);
    			}
    	  });
    	  
    	  oInput.setModel(oModel);
    	  //oInput.setTooltip("Введите количество сотрудников");
    	  
    	  oLabel = new sap.ui.commons.Label("inputDictCount_label", {textAlign: sap.ui.core.TextAlign.Right, design: sap.ui.commons.LabelDesign.Bold});
    	  oLabel.setText("Количество сотрудников:");
    	  oLabel.setLabelFor(oInput);
    	  oMatrix.createRow( new sap.ui.commons.layout.MatrixLayoutCell(
				{
					backgroundDesign : sap.ui.commons.layout.BackgroundDesign.Transparent, // sap.ui.commons.layout.BackgroundDesign
					hAlign : sap.ui.commons.layout.HAlign.Right, // sap.ui.commons.layout.HAlign
					content : [oLabel]
				}), oInput);
    	  oPanel.addContent(oMatrix);
    	  
    	  var oToolbar = new sap.ui.commons.Toolbar("tlb",{width:"100%",design:"Flat"});
    	  oToolbar.addItem(
    			  new sap.ui.commons.Button({
    	    		  id : "ButtonBack", // sap.ui.core.ID
    	    		  text : 'Назад', // string
    	    		  styled : true, // boolean
    	    		  press : function(){ oController.onBackBtnPressed(); }
    	    	  })
    	  );
    	  
    	  oToolbar.addItem(
    			  new sap.ui.commons.Button({
    	    		  id : "ButtonSave", // sap.ui.core.ID
    	    		  text : 'Сохранить', // string
    	    		  styled : true, // boolean
    	    		  style : sap.ui.commons.ButtonStyle.Accept, // sap.ui.commons.ButtonStyle
    	    		  press : function(){ oView.checkInput(oController); } //function(){ oController.onSaveBtnPressed(); }
    	    	  })
    	  );
    	  
    	  
    	  var oMainLayout = new sap.ui.commons.layout.VerticalLayout("MainLayout", {
    		  content: [oPanel, oToolbar]
    	  });
    	  
    	  this.addContent(oMainLayout);
      }
      
      
      , checkInput: function(oController){
    	  var oCore = sap.ui.getCore();
    	  var oInputDictName = oCore.getElementById("inputDictName");
    	  var vDictName = oInputDictName.getValue();
    	  
    	  var bOk = true;
    	  if( vDictName == "" ){
    		  oInputDictName.setValueState( sap.ui.core.ValueState.Error );
    		  bOk = false;
    	  }
    	  if(bOk){
    		  oController.onSaveBtnPressed();
    	  }
      }
});
