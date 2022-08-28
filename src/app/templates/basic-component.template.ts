import { AfterViewInit, Component, Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
    selector: 'message',
    template: `<div style="height:100%; width:100%; display:flex;align-items:center;justify-content:center; cursor:default; z-index:10">
        <h1 style="color:#fff">{{message}}</h1>
    </div>
    `,
})
export class Message {
    @Input() message;
}

@Directive()
export abstract class BasicComponent implements OnInit, AfterViewInit, OnDestroy { 
    protected destroy$: Subject<void> = new Subject<void>();
    protected isLoading: boolean = true;
    
    protected static initialised: boolean = false;
    protected lastLoading: boolean;
    protected loadingLoop;
    
    public settings:any = {};

    public title;

    public data;

    constructor(
        public toast: NzMessageService,
        public modal: NzModalService,
    ) {
        window.addEventListener('online', () => this.setOnline());
        window.addEventListener('offline', () => this.setOffline());
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        BasicComponent.initialised = true;
    }

    setOnline(){

    }

    setOffline() {

    }

    /**
     * Show Warning Message
     * @param message Warning Message to Show
     */
    showWarning(message:string ) {
        if (!environment.testMode)
            this.toast.warning(message, { nzDuration: environment.toastDuration.warning })
    }

    /**
     * Show Error Message
     * @param message Error Message to Show
     * @param loadingIncomplete 
     */
    showError(message:string,  loadingIncomplete?:boolean) {
        if (!environment.testMode)
            this.toast.error(message, { nzDuration: environment.toastDuration.error })
    }

    /**
     * Show Success Message
     * @param message Success Message to Show
     * @param loadingIncomplete 
     */
    showSuccess(message:string, loadingIncomplete?:boolean) {
        if (!environment.testMode)
            this.toast.success(message,{ nzDuration: environment.toastDuration.success });
    }

    /**
     * Show Info Message
     * @param message Info Message to Show
     * @param loadingIncomplete 
     */
    showInfo(message:string, loadingIncomplete?:boolean) {
        if (!environment.testMode)
            this.toast.info(message,{ nzDuration: environment.toastDuration.info });
    }

    /**
     * Show Confirmation Dialog
     * @param title Title For Confirmation Dialog
     * @param content Content Message for Confirmation
     * @param onConfirm Callback for when confirm clicked
     * @param onCancel Callback for when Cancel Clicked
     */
    showConfirmation(title, content, onConfirm = () => {}, onCancel = () => {}){
        this.modal.confirm({
            nzTitle: `<i>${title}</i>`,
            nzContent: `<b>${content}</b>`,
            nzOkText: 'Confirm',
            nzOnOk: () => onConfirm(),
            nzOnCancel: () => onCancel()
        });
    }

    /**
     * Opens Modal Dialog
     * @param component Component to Show in Modal
     * @param data Optional Data to send to Component
     * @returns Modal Reference
     */
    showDialog(component: any, data?: any): NzModalRef{
        return this.modal.create({
            nzContent: component,
            nzFooter: null,
            nzComponentParams: data,
            // nzClosable:false, // False to remove X icon
            nzMaskClosable: false
        })
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}