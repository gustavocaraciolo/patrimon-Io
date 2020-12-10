import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInvestimento } from 'app/shared/model/investimento.model';
import { InvestimentoService } from './investimento.service';

@Component({
  templateUrl: './investimento-delete-dialog.component.html',
})
export class InvestimentoDeleteDialogComponent {
  investimento?: IInvestimento;

  constructor(
    protected investimentoService: InvestimentoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.investimentoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('investimentoListModification');
      this.activeModal.close();
    });
  }
}
