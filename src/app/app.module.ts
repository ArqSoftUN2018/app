import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConnectorProvider } from '../providers/connector/connector';
import { MemoryProvider } from '../providers/memory/memory';
import { NotificationProvider } from '../providers/notification/notification';
import { HttpModule } from '@angular/http'
import { HttpClientModule } from '@angular/common/http'
import { IonicStorageModule } from '@ionic/storage';
import { BoardsPage } from '../pages/boards/boards';
import { LogInPage } from '../pages/log-in/log-in';
import { BoardDetailsPage } from '../pages/board-details/board-details';
import { TaskPage } from '../pages/task/task';
import { BoardUsersPage } from '../pages/board-users/board-users';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    BoardsPage,
    LogInPage,
    BoardDetailsPage,
    TaskPage,
    BoardUsersPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    BoardsPage,
    LogInPage,
    BoardDetailsPage,
    TaskPage,
    BoardUsersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConnectorProvider,
    MemoryProvider,
    NotificationProvider,
    Storage
  ]
})
export class AppModule {}
