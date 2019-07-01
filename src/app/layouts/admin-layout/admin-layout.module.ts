import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { IconsComponent } from '../../icons/icons.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatIconModule,
  MatCardModule,
  MatStepperModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatListModule
} from '@angular/material';

import { AdminDashboardViewComponent } from '../../admin-dashboard-view/admin-dashboard-view.component';
import { ViewStudentComponent } from '../../view-student/view-student.component';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    MatStepperModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatListModule,
    MatTabsModule,
    PdfViewerModule,
  ],
  declarations: [
    DashboardComponent,
    IconsComponent,
    AdminDashboardViewComponent,
    ViewStudentComponent,
        
  ]
})

//platformBrowserDynamic().bootstrapModule(AdminLayoutModule);

export class AdminLayoutModule {}
