#pragma once

#include <3ds.h>
#include <iostream>
#include <string.h>
#include <vector>
#include <3ds.h>

using namespace std;

struct Settings_s{
	char* version;   	//Ex: "1.0.0.0", Unused.
	bool nightly;    	//Ex: true, Unused.
	bool autoUpdate;	//Ex: true, Unused.
	char* themePath; 	//Ex: "/3ds/downloadmii/flatTheme.dmt", Unused.
};

extern Settings_s settings;

void settingsInit(char* settingsPath);