import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './shared/guards/authentication.guard';

const routes: Routes = [
    {
        path: "",
        loadComponent: () => import('./components/pages/home/home.component').then(component => component.HomeComponent)
    },
    {
        path: "dashboard",
        loadComponent: () => import('./components/pages/dashboard/dashboard.component').then(component => component.AdminDashboardComponent),
        canActivate: [AuthenticationGuard]
    },
    {
        path: "user-profile",
        loadComponent: () => import('./components/pages/user-profile/user-profile.component').then(component => component.UserProfileComponent),
        canActivate: [AuthenticationGuard]
    },
    {
        path: "sign-up",
        loadComponent: () => import('./components/pages/authentication/sign-up/sign-up.component').then(component => component.SignUpComponent)
    },
    {
        path: "sign-in",
        loadComponent: () => import('./components/pages/authentication/sign-in/sign-in.component').then(component => component.SignInComponent)
    },
    {
        path: "reset",
        loadComponent: () => import('./components/pages/authentication/password-reset/password-reset.component').then(component => component.PasswordResetComponent)
    },
    {
        path: "questions",
        loadComponent: () => import('./components/pages/QA-panel/QA-panel.component').then(component => component.QAPanelComponent),
        canActivate: [AuthenticationGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }  