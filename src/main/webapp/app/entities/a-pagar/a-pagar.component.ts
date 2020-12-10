import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAPagar } from 'app/shared/model/a-pagar.model';
import { APagarService } from './a-pagar.service';
import { APagarDeleteDialogComponent } from './a-pagar-delete-dialog.component';

@Component({
  selector: 'jhi-a-pagar',
  templateUrl: './a-pagar.component.html',
})
export class APagarComponent implements OnInit, OnDestroy {
  aPagars?: IAPagar[];
  eventSubscriber?: Subscription;

  constructor(
    protected aPagarService: APagarService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.aPagarService.query().subscribe((res: HttpResponse<IAPagar[]>) => (this.aPagars = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAPagars();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAPagar): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInAPagars(): void {
    this.eventSubscriber = this.eventManager.subscribe('aPagarListModification', () => this.loadAll());
  }

  delete(aPagar: IAPagar): void {
    const modalRef = this.modalService.open(APagarDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.aPagar = aPagar;
  }
}
