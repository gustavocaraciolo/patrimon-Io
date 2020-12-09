import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IImovel } from 'app/shared/model/imovel.model';
import { ImovelService } from './imovel.service';

@Component({
  templateUrl: './imovel-delete-dialog.component.html',
})
export class ImovelDeleteDialogComponent {
  imovel?: IImovel;

  constructor(protected imovelService: ImovelService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.imovelService.delete(id).subscribe(() => {
      this.eventManager.broadcast('imovelListModification');
      this.activeModal.close();
    });
  }
}
