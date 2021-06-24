import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { HomepageComponent } from './homepage.component';
import { AddRecordDialogComponent } from './add-record-dialog/add-record-dialog.component';
import { EditRecordDialogComponent } from './edit-record-dialog/edit-record-dialog.component';
import { AuthGuardService } from '../shared/role.guard';

const routes: Routes = [{ path: '', component: HomepageComponent },
{ path: 'addrecord', component: AddRecordDialogComponent },
{ path: 'editrecord', component: EditRecordDialogComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule {}
