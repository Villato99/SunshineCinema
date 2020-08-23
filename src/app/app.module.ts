import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { AdvertisementModule } from './advertisement/advertisement.module';
import { PeliculaModule } from './pelicula/pelicula.module';
import { ProductoModule } from './producto/producto.module';
import { CarteleraModule } from './cartelera/cartelera.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,

    CoreModule,
    ShareModule,

    HomeModule,
    UserModule,
    CarteleraModule,
    AdvertisementModule,
    PeliculaModule,
    ProductoModule,

    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
