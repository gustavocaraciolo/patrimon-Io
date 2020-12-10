import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAReceber } from 'app/shared/model/a-receber.model';
import { AReceberService } from './a-receber.service';

@Component({
  templateUrl: './a-receber-delete-dialog.component.html',
})
export class AReceberDeleteDialogComponent {
  aReceber?: IAReceber;

  constructor(protected aReceberService: AReceberService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.aReceberService.delete(id).subscribe(() => {
      this.eventManager.broadcast('aReceberListModification');
      this.activeModal.close();
    });
  }
}
