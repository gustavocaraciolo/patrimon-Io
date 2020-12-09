import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IAPagar } from 'app/shared/model/a-pagar.model';

@Component({
  selector: 'jhi-a-pagar-detail',
  templateUrl: './a-pagar-detail.component.html',
})
export class APagarDetailComponent implements OnInit {
  aPagar: IAPagar | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ aPagar }) => (this.aPagar = aPagar));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
