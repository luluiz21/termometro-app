import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThermometerComponent } from './features/thermometer/thermometer.component';

const routes: Routes = [
  { path: '', redirectTo: '/thermometer', pathMatch: 'full' },
  { path: 'thermometer', component: ThermometerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
