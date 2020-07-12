import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
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

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    ShareModule,
    HomeModule,
    UserModule,
    AdvertisementModule,
    AppRoutingModule,
    PeliculaModule,
    ProductoModule,
    CarteleraModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
