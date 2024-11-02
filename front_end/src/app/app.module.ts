import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandpageComponent } from './pages/landpage/landpage.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { GuideComponent } from './pages/guide/guide.component';
import { InternalComponent } from './pages/internal/internal.component';
import { ExternalComponent } from './pages/external/external.component';
import { Login1Component } from './pages/login1/login1.component';
import { Login2Component } from './pages/login2/login2.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AppHeaderComponent } from './pages/app-header/app-header.component';
import { AppNavComponent } from './pages/app-nav/app-nav.component';
import { DownloadComponent } from './pages/download/download.component';
import { AddTitlesComponent } from './add-titles/add-titles.component';
import { TitleAndGuideAddComponent } from './pages/title-and-guide-add/title-and-guide-add.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminNavComponent } from './pages/admin-nav/admin-nav.component';




@NgModule({
  declarations: [
    AppComponent,
    LandpageComponent,
    LoginComponent,
    LayoutComponent,
    GuideComponent,
    InternalComponent,
    ExternalComponent,
    Login1Component,
    Login2Component,
    DashboardComponent,
    AdminComponent,
    AppHeaderComponent,
    AppNavComponent,
    DownloadComponent,
    AddTitlesComponent,
    TitleAndGuideAddComponent,
    AdminPageComponent,
    AdminNavComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
     FormsModule
 
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
