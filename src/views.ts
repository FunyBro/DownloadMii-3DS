//    _____                      _                 _ __  __ _ _ 
//   |  __ \                    | |               | |  \/  (_|_)
//   | |  | | _____      ___ __ | | ___   __ _  __| | \  / |_ _ 
//   | |  | |/ _ \ \ /\ / / '_ \| |/ _ \ / _` |/ _` | |\/| | | |
//   | |__| | (_) \ V  V /| | | | | (_) | (_| | (_| | |  | | | |
//   |_____/ \___/ \_/\_/ |_| |_|_|\___/ \__,_|\__,_|_|  |_|_|_|
//                                                              
//   ©2014-2015 filfat Studios AB
//   Licensed under the MIT license

module views {
	export function AllApps(runtime: DownloadMii.Base) {
		var pos = 0,
			page = 0,
			pages = 0;
			
		var items = [];
		
		//Temporary data
		for(var x = 0; x < 100; x++){
			var entry = new DownloadMii.App();
			entry.version = '1.0';
			entry.name = 'App (' + x + ')';
			items.push(entry);
		}
			
		pages = Math.ceil(items.length/21);	
		while(1) {
			var input = Input.getInputDown();
			if(input.KEY_B)
				break;
			else if(input.KEY_A)
				App(runtime, items[pos+(21*page)]);
			else if(input.KEY_RIGHT){
				if((page+1) >= pages)
					page = 0;
				else
					++page;
			} else if(input.KEY_LEFT){
				if(page > 0)
					--page;
				else
					page = pages-1;
			} else if(input.KEY_UP){
				//TODO
				--pos;
			} else if(input.KEY_DOWN){
				//TODO
				++pos;
			}
			
			Console['clear']();
			Console['print']("\n\n  All Apps\n\n");
			for(var x = 0; x < 21; x++) {
				var r = (x+(21*page));
				if(r > (items.length-1)){
					Console['print']("\n");
					continue;
				}
				var item: DownloadMii.App = items[r];
				if(pos === x)
					Console['print'](" >" + item.name + "\n");
				else
					Console['print']("  " + item.name + "\n");
			}
			
			Console['print']("\n  < Page " + (page+1) + " of " + pages + " >");
			Console['flushBuffers']();
		}
	}
	export function App(runtime: DownloadMii.Base, app: DownloadMii.App) {
		while(1) {
			var input = Input.getInputDown();
			if(input.KEY_B)
				break;
			else if(input.KEY_A) {
				Console['clear']();
				Console['print']("\n\n  " + app.name + " v" + app.version + "\n\n\n\n");
				Console['print']("  Downloading...\n");
				Console['flushBuffers']();
				runtime.DownloadApp(app);
				App(runtime, app);
				break;
			}
			
			Console['clear']();
			Console['print']("\n\n  " + app.name + " v" + app.version + "\n\n\n\n");
			Console['print']("  A: Download\n");
			Console['print']("  B: Go back\n");
			Console['flushBuffers']();
		}
	}
	
	export function Main(runtime: DownloadMii.Base) {
		var position = 0;
		var items = [
			{
				title: 'All Apps',
				render: function(runtime: DownloadMii.Base) {
					AllApps(runtime);
				},
			},
			{
				title: 'Settings',
				render: function(runtime: DownloadMii.Base) {
					
				},
			},
			{
				title: 'Exit',
				render: function(runtime: DownloadMii.Base) {
					System.exit();
				},
			},
		];
		
		while(1){
			var input = Input.getInputDown();
			if(input.KEY_A) {
				items[position].render(runtime);
			} else if(input.KEY_DOWN) {
				position = (position + 1) <= (items.length - 1) ? (position + 1) : 0;
			} else if(input.KEY_UP) {
				position = (position - 1) >= 0 ? (position - 1) : (items.length - 1);
			}
			
			Console['clear']();
			Console['print']("\n\n  DownloadMii vXXXX\n\n\n\n");
			for(var x = 0; x < items.length; x++){
				var item = items[x];
				Console['print']((position == x ? " >" : "  ") + item.title + "\n");
			}
			Console['flushBuffers']();
		}
	}
}