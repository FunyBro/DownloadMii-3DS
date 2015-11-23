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
			
		//Temporary data
		var items = runtime.Apps;
			
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
					Console['print'](" > " + item.Name + "\n");
				else
					Console['print']("   " + item.Name + "\n");
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
				Console['print']("\n\n  " + app.Name + " v" + app.Version + "\n\n\n\n");
				Console['print']("  Downloading...");
				Console['flushBuffers']();
				runtime.DownloadApp(app);
				Console['print'](" Done!\n\n  B: Go back\n");
				Console['flushBuffers']();
				while(1){
					input = Input.getInputDown();
					if(input.KEY_B)
						break;
				}
				App(runtime, app);
				break;
			}
			
			Console['clear']();
			Console['print']("\n\n  " + app.Name + " v" + app.Version + "\n\n\n\n");
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
			Console['print']("\n\n  DownloadMii v" + VERSION + "\n\n\n\n");
			for(var x = 0; x < items.length; x++){
				var item = items[x];
				Console['print']((position == x ? " >" : "  ") + item.title + "\n");
			}
			Console['flushBuffers']();
		}
	}
}