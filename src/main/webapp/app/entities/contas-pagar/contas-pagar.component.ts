import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IContasPagar } from 'app/shared/model/contas-pagar.model';
import { ContasPagarService } from './contas-pagar.service';
import { ContasPagarDeleteDialogComponent } from './contas-pagar-delete-dialog.component';

@Component({
  selector: 'jhi-contas-pagar',
  templateUrl: './contas-pagar.component.html',
})
export class ContasPagarComponent implements OnInit, OnDestroy {
  contasPagars?: IContasPagar[];
  eventSubscriber?: Subscription;

  constructor(
    protected contasPagarService: ContasPagarService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.contasPagarService.query().subscribe((res: HttpResponse<IContasPagar[]>) => (this.contasPagars = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInContasPagars();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IContasPagar): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInContasPagars(): void {
    this.eventSubscriber = this.eventManager.subscribe('contasPagarListModification', () => this.loadAll());
  }

  delete(contasPagar: IContasPagar): void {
    const modalRef = this.modalService.open(ContasPagarDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.contasPagar = contasPagar;
  }
}
