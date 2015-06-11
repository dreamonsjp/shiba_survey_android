
var FileChooser = (function (gap) {
	/**
	 * Constructor
	 */
	function FileChooser() {
		this._callback;
	}

	/**
	 * show - true to show the ad, false to hide the ad
	 */
	FileChooser.prototype.show = function(cb) {
		
		this._callback = cb;

		return gap.exec(cb, failureCallback, 'FilePickerPlugin', "open", []);
	};

	

	function failureCallback(err) {
		console.log("FilePickerPlugin.js failed: " + err);
	}

	
    gap.addConstructor(function () {
        if (gap.addPlugin) {
            gap.addPlugin("filePicker", FileChooser);
        } else {
            if (!window.plugins) {
                window.plugins = {};
            }

            window.plugins.filePicker = new FileChooser();
        }
    });
	
	return FileChooser;
	
	
})(window.cordova || window.Cordova || window.PhoneGap);

