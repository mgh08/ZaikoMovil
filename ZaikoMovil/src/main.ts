
import { platformNativeScriptDynamic, NativeScriptModule } from '@nativescript/angular';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import * as appSettings from "@nativescript/core/application-settings";
import { AppComponent } from './app.component';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { appComponents, appRoutes } from './app/app.routing';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent, ...appComponents],
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
class AppComponentModule {}


<<<<<<< HEAD
global.Url = "http://10.171.80.47:8000"
=======
global.Url = "http://10.171.80.94:8000"
>>>>>>> cb2868dfc206e4a07ff855c3f941cf3e3105d135
// global.Url = "http://zaikofactory.pythonanywhere.com"
global.apiUrl = global.Url + "/api/1.0"

global.localStorage = {
    getItem(key: string) {
        return appSettings.getString(key);
    },
    setItem(key: string, value: string) {
        return appSettings.setString(key, value);
    },
    length:0,
    clear(){
        return appSettings.clear();
    },
    key(index){
        return "";
    },
    removeItem(key){
        return appSettings.remove(key);
    }
}

platformNativeScriptDynamic().bootstrapModule(AppComponentModule)

