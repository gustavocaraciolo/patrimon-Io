import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IContasReceber } from 'app/shared/model/contas-receber.model';
import { ContasReceberService } from './contas-receber.service';
import { ContasReceberDeleteDialogComponent } from './contas-receber-delete-dialog.component';

@Component({
  selector: 'jhi-contas-receber',
  templateUrl: './contas-receber.component.html',
})
export class ContasReceberComponent implements OnInit, OnDestroy {
  contasRecebers?: IContasReceber[];
  eventSubscriber?: Subscription;

  constructor(
    protected contasReceberService: ContasReceberService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.contasReceberService.query().subscribe((res: HttpResponse<IContasReceber[]>) => (this.contasRecebers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInContasRecebers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IContasReceber): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInContasRecebers(): void {
    this.eventSubscriber = this.eventManager.subscribe('contasReceberListModification', () => this.loadAll());
  }

  delete(contasReceber: IContasReceber): void {
    const modalRef = this.modalService.open(ContasReceberDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.contasReceber = contasReceber;
  }
}
