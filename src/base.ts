//    _____                      _                 _ __  __ _ _ 
//   |  __ \                    | |               | |  \/  (_|_)
//   | |  | | _____      ___ __ | | ___   __ _  __| | \  / |_ _ 
//   | |  | |/ _ \ \ /\ / / '_ \| |/ _ \ / _` |/ _` | |\/| | | |
//   | |__| | (_) \ V  V /| | | | | (_) | (_| | (_| | |  | | | |
//   |_____/ \___/ \_/\_/ |_| |_|_|\___/ \__,_|\__,_|_|  |_|_|_|
//                                                              
//   ©2014-2015 filfat Studios AB
//   Licensed under the MIT license

/// <reference path="DownloadMii.ts" />
/// <reference path="views.ts" />

declare var Network: any;
declare var System: any;
declare var Input: any;
declare var FileIO: any;

var VERSION = '2.0dev';

var dmii = new DownloadMii.Base();
dmii.ReadFile = function(uri) {
	return FileIO.read(uri);
};
dmii.WriteFile = function(uri, content) {
	return FileIO.write(uri, content);
};
dmii.DownloadFile = function(url) {
	return Network.get(url);
};

function main() {
	Console['init']('top');
	
	dmii.GetSettings();
	dmii.GetApps();
	
	views.Main(dmii);
}

//Start App
main();
