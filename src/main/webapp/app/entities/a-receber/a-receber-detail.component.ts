import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IAReceber } from 'app/shared/model/a-receber.model';

@Component({
  selector: 'jhi-a-receber-detail',
  templateUrl: './a-receber-detail.component.html',
})
export class AReceberDetailComponent implements OnInit {
  aReceber: IAReceber | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ aReceber }) => (this.aReceber = aReceber));
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
