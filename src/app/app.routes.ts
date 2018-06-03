import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { AuthGuardService } from "./services/auth-guard.service";

const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
];

export const AppRoutes = RouterModule.forRoot(appRoutes);
 