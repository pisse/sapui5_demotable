sap.ui.jsview("mytesttable.TableView", {

      getControllerName : function() {
         return "mytesttable.TableView";
      },

      
      createContent : function(oController) {
    	  var oTable = new sap.ui.table.Table("DictsTable", {
    		  title: new sap.ui.commons.TextView({design: sap.ui.commons.TextViewDesign.Bold, width: "100%", textAlign: sap.ui.core.TextAlign.Center, text: "Справочник отделов",
        		  tooltip: new sap.ui.commons.RichTooltip( {title: "Информация", text:"Колонки можно менять местами друг с другом и изменять их ширину путем " +
      		  		"\"перетаскивания\" границы между столбцами. Также при помощи контекстного меню колонок этой таблицы можно выполнить сортировку, фильтрацию данных, а также " +
      		  		"скрыть или отобразать нужные колонки.\nМеню вызывается кликом ЛЕВОЙ кнопки мыши по заголовку колонки."}),  
    		  
    		  }), //"Справочник отделов",
    		  visibleRowCount: 10,
    		  selectionMode: sap.ui.table.SelectionMode.Single,
    		  navigationMode: sap.ui.table.NavigationMode.Paginator, // or ScrollBar
    		  tooltip: new sap.ui.commons.RichTooltip( {title: "Информация", text:"Колонки можно менять местами друг с другом и изменять их ширину путем " +
    		  		"\"перетаскивания\" границы между столбцами. Также при помощи контекстного меню колонок этой таблицы можно выполнить сортировку, фильтрацию данных, а также " +
    		  		"скрыть или отобразать нужные колонки.\nМеню вызывается кликом ЛЕВОЙ кнопки мыши по заголовку колонки."}),
    		  showColumnVisibilityMenu: true,
    		  enableGrouping: false, // группировка работает криво: нет вложенных группировок; непонятно, как отключить группировку; с включенной группировкой не работает фильтр
    		  width: "100%",
    	  });
    	  
    	  // add the checkbox column
    	  oTable.addColumn(new sap.ui.table.Column({
      	  	label: new sap.ui.commons.Label({text: " "}),
      	  	template: new sap.ui.commons.CheckBox().bindProperty("checked", "checked"),
      	  	sortProperty: "checked",
      	  	filterProperty: "checked",
      	  	flexible: false,
      	  	width: "30px",
      	  	hAlign: "Center"
      	  }));
    	  
    	  // ID column
    	  var oColumn = new sap.ui.table.Column({
    	  	label: new sap.ui.commons.Label({design: sap.ui.commons.LabelDesign.Bold, textAlign: sap.ui.core.TextAlign.Center, text: "ID"}),
    	  	template: new sap.ui.commons.TextView().bindProperty("text", "id"),
    	  	sortProperty: "id",
    	  	filterProperty: "id",
    	  	width: "50px"
    	  });
    	  
    	  var oCustomMenu = new sap.ui.commons.Menu();
    	  oCustomMenu.addItem(new sap.ui.commons.MenuItem({
    	  	text:"Custom Menu",
    	  	select:function() {
    	  		alert("Custom Menu");
    	  	}
    	  }));
    	  //oColumn.setMenu(oCustomMenu);
    	  oTable.addColumn(oColumn);
    	  
    	  
    	  // name column
    	  oTable.addColumn(new sap.ui.table.Column({
    	  	label: new sap.ui.commons.Label({design: sap.ui.commons.LabelDesign.Bold, textAlign: sap.ui.core.TextAlign.Center, text: "Название"}),
    	  	template: new sap.ui.commons.TextField().bindProperty("value", "name"),
    	  	sortProperty: "name",
    	  	filterProperty: "name",
    	  	width: "200px"
    	  }));
    	  
    	  // count column
    	  oTable.addColumn(new sap.ui.table.Column({
    	  	label: new sap.ui.commons.Label({design: sap.ui.commons.LabelDesign.Bold, textAlign: sap.ui.core.TextAlign.Center, text: "Количество сотрудников", wrapping: true}),
    	  	template: new sap.ui.commons.TextField( { textAlign: sap.ui.core.TextAlign.Right } ).bindProperty("value", "count"),
    	  	sortProperty: "count",
    	  	filterProperty: "count",
    	  	width: "50px",
    	  	hAlign: sap.ui.commons.layout.HAlign.Right
    	  }));
    	  
    	  
    	  // table toolbar
    	  var oTblToolbar = new sap.ui.commons.Toolbar("TblToolbar");
    	  oTblToolbar.addItem( new sap.ui.commons.Button({
        	  id : "AddBtn", // sap.ui.core.ID
        	  text : 'Добавить', // string
        	  style : sap.ui.commons.ButtonStyle.Default, // sap.ui.commons.ButtonStyle
        	  press : function() { oController.onBtnCreatePressed(); }
          }) );
    	  oTblToolbar.addItem( new sap.ui.commons.Button({
        	  id : "EditBtn", // sap.ui.core.ID
        	  text : 'Изменить', // string
        	  style : sap.ui.commons.ButtonStyle.Default, // sap.ui.commons.ButtonStyle
        	  press : function() { oController.onBtnEditPressed(); }
          }) );
    	  oTblToolbar.addItem( new sap.ui.commons.Button({
        	  id : "DeleteBtn", // sap.ui.core.ID
        	  text : 'Удалить', // string
        	  style : sap.ui.commons.ButtonStyle.Default, // sap.ui.commons.ButtonStyle
        	  press : function() { oController.onAskToDelete(); }
          }) );
    	  
    	  
    	  // toolbar right items
    	  var oRowsCount = new sap.ui.commons.TextField( {
    		  value: "10"
    		, width: "50px"
    		, change : function(oEvent){
	    			var oCount = Number(this.getValue());
	    			if( oCount != oCount || oCount <=0 ){
	    				// oCount != oCount - сравнение на NaN. Если в oCount сидит NaN (например потому, что в качестве значения введена строка,
	    				// то это сравнение позволит определить этот факт, т.к. NaN != NaN
	    				oCount = 10;
	    				this.setValue(oCount);
	    			}
	    			oTable.setVisibleRowCount(oCount);
	    		}
    	  });
    	  oTblToolbar.addRightItem( new sap.ui.commons.Label({ text : "Строк на странице:", labelFor : oRowsCount }) );
    	  oTblToolbar.addRightItem(oRowsCount);
    	  
    	  var oCmbBx_NavMode = new sap.ui.commons.ComboBox( {
    	        items: [new sap.ui.core.ListItem("Paginator",{text: "Страницы", key: "Pg"}),
    	                new sap.ui.core.ListItem("ScrollBar",{text: "С прокруткой", key: "Sb"})],
    	        selectedKey: "Pg",
    	        change: function(oEvent){
    	        		var oKey = oEvent.oSource.getSelectedKey();
    	        		var oNavMode = sap.ui.table.NavigationMode.Paginator;
    	        		if( oKey == "Sb"){
    	        			oNavMode = sap.ui.table.NavigationMode.ScrollBar;
    	        		}
    	        		oTable.setNavigationMode(oNavMode);
    	        	}
    	        });
    	  oTblToolbar.addRightItem( new sap.ui.commons.Label({ text : "Режим просмотра:", labelFor : oCmbBx_NavMode }) );
    	  oTblToolbar.addRightItem(oCmbBx_NavMode);
    	  
          
    	  oTable.setToolbar(oTblToolbar);
    	  
    	  
    	  
    	  var oThemeCombobox = new sap.ui.commons.ComboBox( {
  	        items: [new sap.ui.core.ListItem("sap_goldreflection",{text: "Gold reflection", key: "sap_goldreflection"}),
	                new sap.ui.core.ListItem("sap_hcb",{text: "High Contrast Black", key: "sap_hcb"}),
	                new sap.ui.core.ListItem("sap_platinum",{text: "Platinum", key: "sap_platinum"}),
	                new sap.ui.core.ListItem("sap_ux",{text: "Ux Target Design", key: "sap_ux"})],
	        selectedKey: "sap_platinum",
	        tooltip: new sap.ui.commons.RichTooltip( {title: "Информация", text:"Выберите одну из 4 предлагаемых SAP тем оформления внешнего вида приложения."}), 
	        change: function(oEvent){
	        		var oKey = oEvent.oSource.getSelectedKey();
	        		sap.ui.getCore().applyTheme(oKey);  
	        	}
	        });
    	  
    	  
    	  var oMLayout = new sap.ui.commons.layout.MatrixLayout({ layoutFixed : false, columns: 2, width: "100%" });
    	  oMLayout.createRow(
    			  new sap.ui.commons.TextView({text: "Это - пример, демонстрирующий некоторые возможности фреймворка SAP UI5.\n" +
    			  		"Данный пример рассматривает в своей работе такие рутинные операции, " +
    			  		"как создание, изменение и удаление записей в табличных данных.\n" +
    			  		"Для некоторых контрольных элементов, как, например, для \"Текущей темы оформления\" предусмотрены всплывающие подсказки.\n" +
    			  		"При необходимости для увеличения размеров шрифтов можно изменить масштаб представления страницы.\n" +
    			  		"Пример не использует в своей работе какую-либо базу данных, поэтому никакие реальные данные в ходе его работы повреждены не будут." +
    			  		"Для корректной работы данного примера необходим браузер IE версии не ниже 9.0 или Firefox версии не ниже 10"}),
    			  new sap.ui.commons.layout.MatrixLayoutCell({
    		  hAlign : sap.ui.commons.layout.HAlign.Right, // sap.ui.commons.layout.HAlign
    		  vAlign: sap.ui.commons.layout.VAlign.Top,
    		  content : [ new sap.ui.commons.layout.HorizontalLayout({
    			  content:[ new sap.ui.commons.Label({text: "Текущая тема оформления:", labelFor: oThemeCombobox}), oThemeCombobox ]
    		  }) ]
    	  }));
    	  
    	  
    	  var oVertLayout = new sap.ui.commons.layout.VerticalLayout( {
    		  content: [oMLayout, oTable]
    	  });
    	  
    	  
    	  this.addContent(oVertLayout);
    	  
    	  
//    	  var oMessageBar = new sap.ui.commons.MessageBar("MessageBar");
//    	  oMessageBar.setMaxToasted(3);
//    	  oMessageBar.setMaxListed(7);
//    	  oMessageBar.setAnchorID("DictsTable");
//    	  oMessageBar.setAnchorSnapPoint("begin bottom");
//    	  //TODO: placeAt() не отображает элемент после перехода между экранами
//    	  //oMessageBar.placeAt("MainShell");
//    	  this.addContent(oMessageBar);
    	  
    	  var oNotifBar = new sap.ui.ux3.NotificationBar("NotifBar", {
    		  visibleStatus : sap.ui.ux3.NotificationBarStatus.None, // sap.ui.ux3.NotificationBarStatus
    		  resizeEnabled : false, // boolean
    		  //tooltip : "This is a Tooltip", // sap.ui.core.TooltipBase
    		  display: [ dispNew, this ]
//    		  display : function(oEvent) {
//    			  console.error("in display");
//    			  //var control = oEvent.getSource();
//    			  //console.error("Display: "+control.getId());
//    			  var bShow = oEvent.getParameter("show");
//    			  console.error(bShow);
//    		  }
//			resize : [ function(oEvent) {
//				var control = oEvent.getSource();
//			}, this ]
    	  });
    	  //oNotifBar.attachDisplay(dispNew21);
    	  //oNBar.addStyleClass("sapUiNotificationBarDemokit");
    	  this.addContent(oNotifBar);
      }      
});


function dispNew(oEvent){
	//console.error("I'm a dispNew!");
	var bShow = oEvent.getParameter("show");
	if (bShow) {
		/*
		 * Now the application can decide how to display the bar. It can be maximized, default, minimized (please see NotificationBarStatus) 
		 */
		var sStatus = sap.ui.ux3.NotificationBarStatus.Default;
		oNotiBar2.setVisibleStatus(sStatus);
	} else {
		var sStatus = sap.ui.ux3.NotificationBarStatus.None;
		oNotiBar2.setVisibleStatus(sStatus);
	}
}



