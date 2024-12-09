import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { LandpageComponent } from './pages/landpage/landpage.component';
import { GuideComponent } from './pages/guide/guide.component';
import { InternalComponent } from './pages/internal/internal.component';
import { ExternalComponent } from './pages/external/external.component';
import { Login1Component } from './pages/login1/login1.component';
import { Login2Component } from './pages/login2/login2.component';
import { AdminComponent } from './pages/admin/admin.component';
import { DownloadComponent } from './pages/download/download.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddTitlesComponent } from './add-titles/add-titles.component';
import { TitleAndGuideAddComponent } from './pages/title-and-guide-add/title-and-guide-add.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { ExternalDownloadComponent } from './pages/external-download/external-download.component';

const routes: Routes = [  { path: '', redirectTo: 'landpage', pathMatch: 'full' },
{ path: 'landpage', component: LandpageComponent },
{ path: 'login', component: LoginComponent },
{path: 'layout',component: LayoutComponent},
{ path: 'guide', component: GuideComponent },
{path: 'internal',component: InternalComponent},
{ path: 'login1', component:Login1Component },
{path: 'login2',component:Login2Component },
{ path: 'external', component: ExternalComponent },
{ path:'admin',component: AdminComponent},
{ path:'dashboard',component: DashboardComponent},
{path:'add_title',component: AddTitlesComponent},
{path:'download',component: DownloadComponent},
{path:'external_download',component:ExternalDownloadComponent},
{path:'details_add',component:TitleAndGuideAddComponent},
{path:'admin_page',component:AdminPageComponent}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }


