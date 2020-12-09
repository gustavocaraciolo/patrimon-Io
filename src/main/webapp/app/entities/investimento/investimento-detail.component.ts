import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInvestimento } from 'app/shared/model/investimento.model';

@Component({
  selector: 'jhi-investimento-detail',
  templateUrl: './investimento-detail.component.html',
})
export class InvestimentoDetailComponent implements OnInit {
  investimento: IInvestimento | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ investimento }) => (this.investimento = investimento));
  }

  previousState(): void {
    window.history.back();
  }
}
