import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BasicComponent } from 'src/app/templates/basic-component.template';
import { AssetsService } from '../services/assets.service';
import { MetricTypesService } from '../services/metric-types.service';
import { MetricsService } from '../services/metrics.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-metricsgraph',
  templateUrl: './metricsgraph.component.html',
  styleUrls: ['./metricsgraph.component.scss']
})
export class MetricsgraphComponent extends BasicComponent implements OnInit {

  form: FormGroup;
  assets: [];
  metricTypes = [];
  selectedMetricType;

  constructor(
    toast: NzMessageService,
    modal: NzModalService,
    private fb: FormBuilder,
    private service: MetricsService,
    private assetsService: AssetsService,
    private metricTypesService: MetricTypesService
  ) {
    super(toast, modal)
   }

  public graph = {
    data: [],
    layout: {title: 'Chart'}
  };

  ngOnInit(): void {
    this.form = this.fb.group({
      assetId: ['', Validators.required],
      metricTypeId: ['', Validators.required]
    });

    this.getAssets();
    this.getMetricTypes()
  }

  get generateButtonEnabled() {
    return this.assets?.length > 0 && this.metricTypes?.length > 0 && this.form.valid;
  }

  getAssets(){
    this.assetsService.getAll().subscribe(data=>{
      this.assets = data
    });
  }

  getMetricTypes(){
    this.metricTypesService.getAll().subscribe(data=>{
      this.metricTypes = data
    });
  }

  getGraphData(){
    this.service.getMetricsGraph(this.form.value.assetId,this.form.value.metricTypeId).subscribe(data=>{
      data.forEach(plot => {
        this.graph.data.push(plot);
      });
      this.creatDataArray(data[0]);
      this.loadSelectedMetricType();
      this.showSuccess('Report and Graph Generated!');
    })
  }

  loadSelectedMetricType(){
    this.selectedMetricType = this.metricTypes?.find(m=>m.id == this.form.value.metricTypeId);
    this.graph.layout = null;
    this.graph.layout = {title: this.selectedMetricType.name}
  }

  getGraphForecast() {
    this.service.getMetricsForecastedGraph(this.form.value.assetId,this.form.value.metricTypeId).subscribe(data=>{
      data.forEach(plot => {
        this.graph.data.unshift(plot);
      });
      this.creatDataArray(data[0]);
      this.loadSelectedMetricType();
      this.showSuccess('Report and Graph Forecast Generated!');
    })
  }

  generateReport(){
    this.graph.data = [];
    this.getGraphData();
  }

  creatDataArray(data){
    this.data = [];
    data.x.forEach((x, i)=>{
      this.data.push({
        date:x,
        value:data.y[i]
      })
    })
  }

  selectedTab = 1;

  tabSelected(e){
    this.selectedTab = e;
  }

  public openPDF(): void {
    // let DATA: any = document.getElementById('htmlData');

    let HTML = document.createElement('div');
    HTML.innerHTML = '<div class="col-md-8 w-100 mt-5 ml-5" id="htmlData"> <table class="table table-bordered w-100"> <tr class="table-primary"> <th>Date</th> <th>Value</th> </tr> </table> </div>';

    const mainhead = document.createElement('h3');
    mainhead.innerText = "Metrics Report";
    mainhead.className = 'mt-5 ml-5';

    const subhead = document.createElement('h5');
    const asset = this.assets.find(a=>a['id'] == this.form.get('assetId').value);
    const metricType = this.metricTypes.find(a=>a['id'] == this.form.get('metricTypeId').value);
    subhead.innerHTML = `${asset['name']} - ${metricType["name"]}`;
    subhead.className = 'mt-5 ml-5';

    HTML.prepend(subhead);
    HTML.prepend(mainhead);

    this.data.forEach(rec=>{
      let tr = document.createElement('tr');
      tr.innerHTML = `<td>${rec.date}</td> <td>${rec.value}</td>`
  
      HTML.getElementsByClassName("table")[0].append(tr);
    })    

    document.body.appendChild(HTML);
    html2canvas(HTML).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(`${asset['name']} - ${metricType["name"]}`);
    });
    HTML.remove();
  }

}
