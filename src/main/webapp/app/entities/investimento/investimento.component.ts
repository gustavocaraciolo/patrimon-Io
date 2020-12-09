import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInvestimento } from 'app/shared/model/investimento.model';
import { InvestimentoService } from './investimento.service';
import { InvestimentoDeleteDialogComponent } from './investimento-delete-dialog.component';

@Component({
  selector: 'jhi-investimento',
  templateUrl: './investimento.component.html',
})
export class InvestimentoComponent implements OnInit, OnDestroy {
  investimentos?: IInvestimento[];
  eventSubscriber?: Subscription;

  constructor(
    protected investimentoService: InvestimentoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.investimentoService.query().subscribe((res: HttpResponse<IInvestimento[]>) => (this.investimentos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInInvestimentos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IInvestimento): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInInvestimentos(): void {
    this.eventSubscriber = this.eventManager.subscribe('investimentoListModification', () => this.loadAll());
  }

  delete(investimento: IInvestimento): void {
    const modalRef = this.modalService.open(InvestimentoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.investimento = investimento;
  }
}
