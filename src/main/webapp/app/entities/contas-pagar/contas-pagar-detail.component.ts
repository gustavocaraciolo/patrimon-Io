import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContasPagar } from 'app/shared/model/contas-pagar.model';

@Component({
  selector: 'jhi-contas-pagar-detail',
  templateUrl: './contas-pagar-detail.component.html',
})
export class ContasPagarDetailComponent implements OnInit {
  contasPagar: IContasPagar | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contasPagar }) => (this.contasPagar = contasPagar));
  }

  previousState(): void {
    window.history.back();
  }
}
