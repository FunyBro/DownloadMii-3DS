/// <reference path="DownloadMii.ts" />
/// <reference path="views.ts" />
declare var Network: any;
declare var System: any;
declare var Input: any;
declare var FileIO: any;

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
	views.Main(dmii);
}

//Start App
main();