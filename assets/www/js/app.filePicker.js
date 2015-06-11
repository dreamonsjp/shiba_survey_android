
var filePicker = (function ($, app) {
    "use strict";

   

    app.handleFiles = function(elm) {
            event.stopPropagation();
	    var currentField = $(elm);
	    

	    window.plugins.filePicker.show(function(returnURL) {
	        if(returnURL !== "") {
	            
                    
                    window.resolveLocalFileSystemURI(returnURL, function(fileEntry){
                       
                        /*
                        currentField.attr("fileURL",returnURL);
                        currentField.val(returnURL.substr(returnURL.lastIndexOf('/')+1));
                        */
                        var selectedFileSize = 0;
                        
                        
                        var fileExtension = String(fileEntry.name).substr(fileEntry.name.lastIndexOf('.')+1);
                        
                        
                        var allowedExtensions = currentField.attr('allowed_filetypes').replace(/ /g,"");
                        
                        var allowedExtensionsArray = allowedExtensions.split(",");
                        
                        var length = allowedExtensionsArray.length;
                        var allowed = false;
                        for(var i = 0; i < length ; i++)
                        {
                            if(String(fileExtension).toUpperCase() == String(allowedExtensionsArray[i]).toUpperCase())
                            {
                                allowed = true;
                                
                                break;
                            }
                        }
                        if(!allowed)
                        {
                            navigator.notification.alert('Selected file is not allowed. Only "'+ allowedExtensions +'" are allowed!', function () {
                           }, 'Error');
                        }
                        else
                        {
                            var maxAllowedSize = parseInt(currentField.attr('allowed_filesize'));
                            
                            var getFileSuccess = function(file)
                            {
                                selectedFileSize = file.size;
                                
                                if(selectedFileSize/1024 <= maxAllowedSize)
                                {
                                    currentField.attr("fileURL",fileEntry.fullPath);
                                    currentField.val(fileEntry.name);
                                }
                                else
                                {
                                    navigator.notification.alert('Maximum file size allowed is '+maxAllowedSize+' KB only. Plz try again!', function () {
                                   }, 'Error');
                                }
                            };

                            fileEntry.file(getFileSuccess, function(){});
                            
                        }
                        //currentField.attr("fileURL",fileEntry.fullPath);
                        //currentField.val(fileEntry.name);
                        
                    }, function(){});
                    
                    //Application.uploadAFile(currentField,returnURL,g_selectedSid,g_selectedSurveyLang,currentField.attr("name"));

                    
                    
                    
	        }
	       
                
	    });
    };

    return app;
}(jQuery, filePicker || {}));

