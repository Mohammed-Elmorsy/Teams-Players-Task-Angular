import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccordionModule } from 'primeng/accordion';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';




@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,

    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    AccordionModule,
    TagModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    RippleModule,
    ConfirmDialogModule,
    StepsModule,
    CardModule,
    ScrollPanelModule

  ]
})
export class DashboardModule { }
