import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContasPagar } from 'app/shared/model/contas-pagar.model';
import { ContasPagarService } from './contas-pagar.service';

@Component({
  templateUrl: './contas-pagar-delete-dialog.component.html',
})
export class ContasPagarDeleteDialogComponent {
  contasPagar?: IContasPagar;

  constructor(
    protected contasPagarService: ContasPagarService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.contasPagarService.delete(id).subscribe(() => {
      this.eventManager.broadcast('contasPagarListModification');
      this.activeModal.close();
    });
  }
}
