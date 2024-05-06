import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // provideFirebaseApp(() =>
    //   initializeApp({
    //     projectId: 'ionic-auth-app-eaff8',
    //     appId: '1:726768556363:web:e3b6d322ba62bff3b1f0ce',
    //     storageBucket: 'ionic-auth-app-eaff8.appspot.com',
    //     apiKey: 'AIzaSyDD4rNct4NTGvjk82C9yDDees-wp9_uY98',
    //     authDomain: 'ionic-auth-app-eaff8.firebaseapp.com',
    //     messagingSenderId: '726768556363',
    //     measurementId: 'G-CS4ZES5P8Z',
    //   })
    // ),
    provideAuth(() => getAuth()),
    provideFirebaseApp(() => initializeApp({"projectId":"chat-aula-405bc","appId":"1:904957618774:web:9e2d23b9c1db8db1b3a9f7","storageBucket":"chat-aula-405bc.appspot.com","apiKey":"AIzaSyCNEkcwqHUzp0u0C3R9F1w_vtFKFhv23A4","authDomain":"chat-aula-405bc.firebaseapp.com","messagingSenderId":"904957618774","measurementId":"G-CFK3N5HNJT"})),
    provideFirestore(() => getFirestore()),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
