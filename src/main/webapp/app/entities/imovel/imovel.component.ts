import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IImovel } from 'app/shared/model/imovel.model';
import { ImovelService } from './imovel.service';
import { ImovelDeleteDialogComponent } from './imovel-delete-dialog.component';

@Component({
  selector: 'jhi-imovel',
  templateUrl: './imovel.component.html',
})
export class ImovelComponent implements OnInit, OnDestroy {
  imovels?: IImovel[];
  eventSubscriber?: Subscription;

  constructor(
    protected imovelService: ImovelService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.imovelService.query().subscribe((res: HttpResponse<IImovel[]>) => (this.imovels = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInImovels();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IImovel): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInImovels(): void {
    this.eventSubscriber = this.eventManager.subscribe('imovelListModification', () => this.loadAll());
  }

  delete(imovel: IImovel): void {
    const modalRef = this.modalService.open(ImovelDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.imovel = imovel;
  }
}
