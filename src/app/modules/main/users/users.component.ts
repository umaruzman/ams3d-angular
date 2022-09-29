import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BasicComponent } from 'src/app/templates/basic-component.template';
import { MetricTypesService } from '../services/metric-types.service';
import { UsersService } from '../services/users.service';
import { NewUserFormComponent } from './new-user-form/new-user-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BasicComponent implements OnInit {

  constructor(
    toast: NzMessageService,
    modal: NzModalService,
    private service: UsersService
  ) {
    super(toast,modal);
  }

  ngOnInit(): void {
    this.getAllMetrics();
  }

  getAllMetrics(){
    this.service.getAll()
      .subscribe(data=>{
        this.data = data.data;
        console.log('Init Data', data);
      },
      (e)=>{
        this.showError('Failed to Load Data', e);
      })
  }


  newMetricForm(){
    const ref = this.showDialog(NewUserFormComponent);
    ref.afterClose.subscribe(data=>{
      if(data?.data){
        this.saveMetric(data.data);
      }
    });
  }

  editMetricForm(asset){
    const ref = this.showDialog(NewUserFormComponent, {editData: asset});
    ref.afterClose.subscribe(data=>{
      if(data?.data){
        this.updateMetric(data.data);
      }
    });
  }

  saveMetric(data){
    this.service.add(data).subscribe((res)=>{
      this.showSuccess('Asset Added Successfully!');
      this.getAllMetrics();
    },
    () => {
      this.showError('Failed to add Asset, please check and try again!');
    });
  }

  updateMetric(data){
    this.service.update(data.id,data).subscribe((res)=>{
      this.showSuccess('Asset Changes Saved Successfully!');
      this.getAllMetrics();
    },
    () => {
      this.showError('Failed to save changes to Asset, please check and try again!');
    });
  }



  deleteMetric(id){
    this.service.delete(id).subscribe((res)=>{
      this.showSuccess('Successfully Deleted Asset!');
      this.getAllMetrics();
    },
    () => {
      this.showError('Failed to delete Asset, please check and try again!');
    });
  }

}
