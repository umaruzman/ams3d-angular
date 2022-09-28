import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BasicComponent } from 'src/app/templates/basic-component.template';
import { MetricTypesService } from '../services/metric-types.service';
import { NewMetricTypeFormComponent } from './new-metric-type-form/new-metric-type-form.component';

@Component({
  selector: 'app-metric-types',
  templateUrl: './metric-types.component.html',
  styleUrls: ['./metric-types.component.scss']
})
export class MetricTypesComponent extends BasicComponent implements OnInit {

  constructor(
    toast: NzMessageService,
    modal: NzModalService,
    private service: MetricTypesService
  ) {
    super(toast,modal);
  }

  ngOnInit(): void {
    this.getAllMetrics();
  }

  getAllMetrics(){
    this.service.getAll()
      .subscribe(data=>{
        this.data = data;
        console.log('Init Data', data);
      },
      (e)=>{
        this.showError('Failed to Load Data', e);
      })
  }


  newMetricForm(){
    const ref = this.showDialog(NewMetricTypeFormComponent);
    ref.afterClose.subscribe(data=>{
      if(data?.data){
        this.saveMetric(data.data);
      }
    });
  }

  editMetricForm(asset){
    const ref = this.showDialog(NewMetricTypeFormComponent, {editData: asset});
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
