import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IContasReceber, ContasReceber } from 'app/shared/model/contas-receber.model';
import { ContasReceberService } from './contas-receber.service';
import { IImovel } from 'app/shared/model/imovel.model';
import { ImovelService } from 'app/entities/imovel/imovel.service';

@Component({
  selector: 'jhi-contas-receber-update',
  templateUrl: './contas-receber-update.component.html',
})
export class ContasReceberUpdateComponent implements OnInit {
  isSaving = false;
  imovels: IImovel[] = [];
  dtRecebidoDp: any;
  dtRecebimentoDp: any;

  editForm = this.fb.group({
    id: [],
    dtRecebido: [],
    dtRecebimento: [],
    valor: [],
    pago: [],
    imovel: [],
  });

  constructor(
    protected contasReceberService: ContasReceberService,
    protected imovelService: ImovelService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contasReceber }) => {
      this.updateForm(contasReceber);

      this.imovelService.query().subscribe((res: HttpResponse<IImovel[]>) => (this.imovels = res.body || []));
    });
  }

  updateForm(contasReceber: IContasReceber): void {
    this.editForm.patchValue({
      id: contasReceber.id,
      dtRecebido: contasReceber.dtRecebido,
      dtRecebimento: contasReceber.dtRecebimento,
      valor: contasReceber.valor,
      pago: contasReceber.pago,
      imovel: contasReceber.imovel,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contasReceber = this.createFromForm();
    if (contasReceber.id !== undefined) {
      this.subscribeToSaveResponse(this.contasReceberService.update(contasReceber));
    } else {
      this.subscribeToSaveResponse(this.contasReceberService.create(contasReceber));
    }
  }

  private createFromForm(): IContasReceber {
    return {
      ...new ContasReceber(),
      id: this.editForm.get(['id'])!.value,
      dtRecebido: this.editForm.get(['dtRecebido'])!.value,
      dtRecebimento: this.editForm.get(['dtRecebimento'])!.value,
      valor: this.editForm.get(['valor'])!.value,
      pago: this.editForm.get(['pago'])!.value,
      imovel: this.editForm.get(['imovel'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContasReceber>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IImovel): any {
    return item.id;
  }
}
