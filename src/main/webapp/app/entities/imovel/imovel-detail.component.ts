import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IImovel } from 'app/shared/model/imovel.model';

@Component({
  selector: 'jhi-imovel-detail',
  templateUrl: './imovel-detail.component.html',
})
export class ImovelDetailComponent implements OnInit {
  imovel: IImovel | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ imovel }) => (this.imovel = imovel));
  }

  previousState(): void {
    window.history.back();
  }
}
