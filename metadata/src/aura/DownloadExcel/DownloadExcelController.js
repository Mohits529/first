({
    // ## function call on component load  
    loadContactList: function(component, event, helper){
       helper.onLoad(component, event);
    },
    
    // ## function call on Click on the "Download As CSV" Button. 
   /* downloadCsv : function(component,event,helper){
        
        // get the Records [contact] list from 'ListOfContact' attribute 
        var stockData = component.get("v.ListOfContact");
        
        // call the helper function which "return" the CSV data as a String   
        var csvContent = helper.convertArrayOfObjectsToCSV(component,stockData);   
         if (csvContent == null){return;} 
        
        // ####--code for create a temp. <a> html tag [link tag] for download the CSV file--####     
	     var hiddenElement = document.createElement('a');
          hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
          hiddenElement.target = '_self'; // 
          hiddenElement.download = 'ExportData';  // CSV file Name* you can change it.[only name not .csv] 
          document.body.appendChild(hiddenElement); // Required for FireFox browser
    	  hiddenElement.click(); // using click() js function to download csv file
        },*/ 
 


 downloadCsv : function (component, event, helper) {
        var lstPositions = component.get("v.ListOfContact");
       var PositionTitle = 'Selected Contact';
        var data = [];
        var headerArray = [];
        var csvContentArray = [];
        //Provide the title 
      var CSV = '\r\nSelected Position\r\n';

        
        //Fill out the Header of CSV
		headerArray.push('FirstName');
        headerArray.push('LastName');
        headerArray.push('Department');
        headerArray.push('MobilePhone');
        headerArray.push('Id');
        data.push(headerArray);

        var sno = 0;
        for(var i=0;i<lstPositions.length;i++){
            
            //Check for records selected by the user
            if(lstPositions[i]){
                //Initialize the temperory array
                var tempArray = [];
                //use parseInt to perform math operation
                sno = parseInt(sno) + parseInt(1);
                tempArray.push('"'+sno+'"');
                tempArray.push('"'+lstPositions[i].FirstName+'"');
                tempArray.push('"'+lstPositions[i].LastName+'"');
                  tempArray.push('"'+lstPositions[i].Department+'"');
                  tempArray.push('"'+lstPositions[i].MobilePhone+'"');
                                  tempArray.push('"'+lstPositions[i].Id+'"');

                data.push(tempArray);
            }
            
        }
        
        for(var j=0;j<data.length;j++){
            var dataString = data[j].join(",");
            csvContentArray.push(dataString);
        }
        var csvContent = CSV + csvContentArray.join("\r\n");
        
        //Generate a file name
        var fileName = "MyReport_";
        //this will remove the blank-spaces from the title and replace it with an underscore
        fileName += PositionTitle.replace(/ /g,"_");   
        fileName += ".csv";
        //Initialize file format you want csv or xls
        var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
        
        if (navigator.msSaveBlob) { // IE 10+
            console.log('----------------if-----------');
            var blob = new Blob([csvContent],{type: "text/csv;charset=utf-8;"});
            console.log('----------------if-----------'+blob);
        	navigator.msSaveBlob(blob, fileName);
        }
        else{
            // Download file
            // you can use either>> window.open(uri);
            // but this will not work in some browsers
            // or you will not get the correct file extension    
            var link = document.createElement("a");

            //link.download to give filename with extension
            //link.download = fileName;
            link.setAttribute('download',fileName);
            //To set the content of the file
            link.href = uri;
            
            //set the visibility hidden so it will not effect on your web-layout
            link.style = "visibility:hidden";
            
            //this part will append the anchor tag and remove it after automatic click
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          
    	}
    }
})