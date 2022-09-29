import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { bounceOutRightOnLeaveAnimation, fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AssetLabelMarkerExtension } from 'src/app/extensions/AssetLabelMarkerExtension';
import { ViewerNavigationMode } from 'src/app/models/modes/ViewerNavigationMode';
import { BasicComponent } from 'src/app/templates/basic-component.template';
import { AssetsService } from '../main/services/assets.service';
import { AssignAssetForm } from './assign-asset-form/assign-asset-form.component';
import { ViewerService } from './viewer.service';

declare const Autodesk: any;


@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  animations: [
    bounceOutRightOnLeaveAnimation({anchor: 'modalOut', delay: 400}),
    fadeOutOnLeaveAnimation(),
    fadeInOnEnterAnimation({anchor: 'fadeIn', delay: 1000})
  ]
})
export class ViewerComponent extends BasicComponent implements OnInit {

  @ViewChild('viewerContainer') viewerContainer: any;
  @ViewChild('model') modelContainer: any;

  DOCUMENT_URL = 'http://localhost:4200/assets/model/5033/Resource/3D View/{3D} 805045/{3D}.svf'

  viewer;

  selectedDbId = 0;
  viewAssetDetails = false;

  assetsOnModel;
  selectedAsset;
  selectedAssetMetrics;

  progress:any = {
    state: 1,
    progress: 0
  };

  constructor(
    toast: NzMessageService,
    modal: NzModalService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private service: ViewerService,
    private assetService: AssetsService
  ) { 
    super(toast, modal)
  }

  ngOnInit(): void {
    this.loadAssetOnModel();
  }

  ngAfterViewInit() {
    this.registerExtensions();
    this.launchViewer();
  }

  loadAssetOnModel(){
    this.assetService.getAllAssetOnModel().subscribe(data=>{
      data = data.map(a => {
        return {
          ...a,
          asset: {
            ...a.asset,
            properties: JSON.parse(a.asset.properties)
          }
        }
      });
      this.assetsOnModel = data;
    },
    ()=>{
      this.showError("Failed to load asset Data, please retry")
    })
  }

  getLatesAssetMetrics() {
    this.assetService.getAllAssetLatestMetrics(this.selectedAsset.asset.id).subscribe(data=>{
      this.selectedAssetMetrics = data;
    })
  }

  private launchViewer() {
    if (this.viewer) {
      // Viewer has already been initialised
      return;
    }
   
    const options = {
      env: 'Local',
      document: this.DOCUMENT_URL,
      api: 'derivativeV2',
    };
   
    // For a headless viewer
    this.viewer = new Autodesk.Viewing.Viewer3D(this.modelContainer.nativeElement, {
      memory: { limit: 5 * 1024  },
      extensions: [
        'Autodesk.ViewCubeUi',
        // 'Autodesk.AEC.Minimap3DExtension', 
        'Autodesk.AEC.LevelsExtension'
      ],
      loaderExtensions: { svf: "Autodesk.MemoryLimited" }
    });
   
    this.loadDocument(options)
  }
   
  private loadDocument(options) {
    Autodesk.Viewing.endpoint.getItemApi = (endpoint, derivativeUrn, api) => {
      const derivative = derivativeUrn.split('Resource')[1];
      
      if (derivativeUrn.indexOf('.svf') > -1)
        return options.document;

      let pathToModel:String = options.document.split('Resource')[0] + 'Resource';
      return pathToModel + decodeURIComponent(derivativeUrn.split('Resource')[1])
    }

    Autodesk.Viewing.Initializer(options, 
      () => {
        this.service.getManifest(options.document).subscribe(
              manifest => {
                const doc = new Autodesk.Viewing.Document(manifest);
                doc.downloadAecModelData();
                
                this.viewer.start();
                this.viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry(), options);

                this.init();

                this.viewer.addEventListener(Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT, (ev) =>{
                  this.viewer.getExtension('AssetLabelMarkerExtension', ext => ext.showIcons(true));
                  this.viewer.getExtension('AssetLabelMarkerExtension', ext => ext.updateIcons());
                });

                this.viewer.addEventListener(Autodesk.Viewing.PROGRESS_UPDATE_EVENT,ev => {
                  if (ev.state > 0) {
                    this.progress = {
                      state: ev.state,
                      progress: Math.floor(ev.percent)
                    };
    
                    if (this.progress?.state == 2) {
                      if (this.progress.progress == 100)
                        this.cd.detectChanges();
                    }
                  }
                });

                this.viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, ev =>{ 
                  let dbIds = ev.dbIdArray;
                  console.log(dbIds);

                  this.selectedDbId = 0;
                  this.selectedAsset = null;
                  this.selectedAssetMetrics = null;
                  console.log('Assets on the Model', this.assetsOnModel);
                  
                  if(dbIds.length > 0) {
                    this.selectedDbId = dbIds[0];
                    this.selectedAsset = this.assetsOnModel?.find(a=>a.dbid == this.selectedDbId);
                    if(this.selectedAsset){
                      this.getLatesAssetMetrics()
                    }
                    console.log('Selected Asset', this.selectedAsset)
                  }
                });

                this.viewer.addEventListener(Autodesk.Viewing.TEXTURES_LOADED_EVENT,ev => {
                  this.viewer.loadExtension('Autodesk.BimWalk');
                });

              },
              err => {
                console.log("Viewer failed to initialize", err)
              }
            );
          }, err => {
            console.log("Viewer failed to initialize", err)
          })
  }

   
  private registerExtensions():void {
    Autodesk.Viewing.theExtensionManager.registerExtension('AssetLabelMarkerExtension', AssetLabelMarkerExtension);
  }

  private init() {
    this.viewer.loadExtension('AssetLabelMarkerExtension',{
      assets: [
        // { dbId: 7094, label: '300&#176;C', css: 'fas fa-thermometer-full' },
        // { dbId: 4724, label: '356&#176;C', css: 'fas fa-thermometer-full' },
        // { dbId: 6553, label: '356&#176;C', css: 'fas fa-thermometer-full' },
      ],
      onClick: (id) => {
        this.viewer.select(id);
        this.viewer.utilities.fitToView();
      }
    });
  }
   
  ngOnDestroy() {
    // Clean up the viewer when the component is destroyed
    if (this.viewer && this.viewer.running) {
      this.viewer.tearDown();
      this.viewer.finish();
      this.viewer = null;
    }
  }

  navMode = ViewerNavigationMode.ORBIT;

  setNavButtons(navMode) {
    this.navMode = navMode;
  }
  
  exitViewer() {
    this.router.navigate(['/assets']);
  }

  pan() {
    this.setNavButtons(ViewerNavigationMode.PAN);

    if (this.viewer.getActiveNavigationTool() != 'pan') 
      this.viewer.setActiveNavigationTool('pan');

    this.showInfo(`Viewer Changed to ${ViewerNavigationMode[this.navMode]} Mode`);
    
  }

  zoom() {
    this.setNavButtons(ViewerNavigationMode.ZOOM);

    if (this.viewer.getActiveNavigationTool() != 'dolly') 
      this.viewer.setActiveNavigationTool('dolly');

    this.showInfo(`Viewer Changed to ${ViewerNavigationMode[this.navMode]} Mode`);
  }

  orbit() {
    this.setNavButtons(ViewerNavigationMode.ORBIT);
    if (this.viewer.getActiveNavigationTool() != 'orbit') 
      this.viewer.setActiveNavigationTool('orbit');
    this.showInfo(`Viewer Changed to ${ViewerNavigationMode[this.navMode]} Mode`);
  }

  toggleMode(mode){

  }


  clearSelection(){
    this.viewer.select();
  }

  toggleFirstPerson(){
    if(this.navMode == ViewerNavigationMode.FIRST_PERSON) {
      this.firstPerson(false, false);
    } else  {
     this.firstPerson(true, false);
    }

    this.showInfo(`Viewer Changed to ${ViewerNavigationMode[this.navMode]} Mode`);
  }

  openAssetDetailDrawer(selectedAsset) {
    this.viewAssetDetails = true;
  }

  closeAssetDetailDrawer() {
    this.viewAssetDetails = false;
  }

  public firstPerson(enabled:boolean, showMessage = true) {
    this.viewer.setBimWalkToolPopup(showMessage);

    this.viewer.getExtension('Autodesk.BimWalk', bimWalk=>{
      console.log('BimWalk', bimWalk);
      
      if (enabled && !bimWalk['isActive']('')) {
        bimWalk['activate']('');
        this.setNavButtons(ViewerNavigationMode.FIRST_PERSON);
      } else if (!enabled && bimWalk['isActive']('')) {
        bimWalk['deactivate']();
        this.setNavButtons(ViewerNavigationMode.ORBIT);
      }
    });
  }

  assignAssetForm(){
    const ref = this.showDialog(AssignAssetForm, {dbid: this.selectedDbId});
    ref.afterClose.subscribe(data=>{
      if(data?.data){
        console.log(data); 
      }
    });
  }

}
