import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContasReceber } from 'app/shared/model/contas-receber.model';
import { ContasReceberService } from './contas-receber.service';

@Component({
  templateUrl: './contas-receber-delete-dialog.component.html',
})
export class ContasReceberDeleteDialogComponent {
  contasReceber?: IContasReceber;

  constructor(
    protected contasReceberService: ContasReceberService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.contasReceberService.delete(id).subscribe(() => {
      this.eventManager.broadcast('contasReceberListModification');
      this.activeModal.close();
    });
  }
}
