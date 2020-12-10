import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAPagar } from 'app/shared/model/a-pagar.model';
import { APagarService } from './a-pagar.service';

@Component({
  templateUrl: './a-pagar-delete-dialog.component.html',
})
export class APagarDeleteDialogComponent {
  aPagar?: IAPagar;

  constructor(protected aPagarService: APagarService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.aPagarService.delete(id).subscribe(() => {
      this.eventManager.broadcast('aPagarListModification');
      this.activeModal.close();
    });
  }
}
