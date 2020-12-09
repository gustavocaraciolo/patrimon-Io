import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAReceber } from 'app/shared/model/a-receber.model';
import { AReceberService } from './a-receber.service';
import { AReceberDeleteDialogComponent } from './a-receber-delete-dialog.component';

@Component({
  selector: 'jhi-a-receber',
  templateUrl: './a-receber.component.html',
})
export class AReceberComponent implements OnInit, OnDestroy {
  aRecebers?: IAReceber[];
  eventSubscriber?: Subscription;

  constructor(
    protected aReceberService: AReceberService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.aReceberService.query().subscribe((res: HttpResponse<IAReceber[]>) => (this.aRecebers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInARecebers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAReceber): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInARecebers(): void {
    this.eventSubscriber = this.eventManager.subscribe('aReceberListModification', () => this.loadAll());
  }

  delete(aReceber: IAReceber): void {
    const modalRef = this.modalService.open(AReceberDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.aReceber = aReceber;
  }
}
