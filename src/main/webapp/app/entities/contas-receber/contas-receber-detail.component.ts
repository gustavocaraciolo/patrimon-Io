import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContasReceber } from 'app/shared/model/contas-receber.model';

@Component({
  selector: 'jhi-contas-receber-detail',
  templateUrl: './contas-receber-detail.component.html',
})
export class ContasReceberDetailComponent implements OnInit {
  contasReceber: IContasReceber | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contasReceber }) => (this.contasReceber = contasReceber));
  }

  previousState(): void {
    window.history.back();
  }
}
