import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IContasPagar, ContasPagar } from 'app/shared/model/contas-pagar.model';
import { ContasPagarService } from './contas-pagar.service';
import { IImovel } from 'app/shared/model/imovel.model';
import { ImovelService } from 'app/entities/imovel/imovel.service';

@Component({
  selector: 'jhi-contas-pagar-update',
  templateUrl: './contas-pagar-update.component.html',
})
export class ContasPagarUpdateComponent implements OnInit {
  isSaving = false;
  imovels: IImovel[] = [];
  dtPagamentoDp: any;
  dtVencimentoDp: any;

  editForm = this.fb.group({
    id: [],
    dtPagamento: [],
    dtVencimento: [],
    valor: [],
    pago: [],
    imovel: [],
  });

  constructor(
    protected contasPagarService: ContasPagarService,
    protected imovelService: ImovelService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contasPagar }) => {
      this.updateForm(contasPagar);

      this.imovelService.query().subscribe((res: HttpResponse<IImovel[]>) => (this.imovels = res.body || []));
    });
  }

  updateForm(contasPagar: IContasPagar): void {
    this.editForm.patchValue({
      id: contasPagar.id,
      dtPagamento: contasPagar.dtPagamento,
      dtVencimento: contasPagar.dtVencimento,
      valor: contasPagar.valor,
      pago: contasPagar.pago,
      imovel: contasPagar.imovel,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contasPagar = this.createFromForm();
    if (contasPagar.id !== undefined) {
      this.subscribeToSaveResponse(this.contasPagarService.update(contasPagar));
    } else {
      this.subscribeToSaveResponse(this.contasPagarService.create(contasPagar));
    }
  }

  private createFromForm(): IContasPagar {
    return {
      ...new ContasPagar(),
      id: this.editForm.get(['id'])!.value,
      dtPagamento: this.editForm.get(['dtPagamento'])!.value,
      dtVencimento: this.editForm.get(['dtVencimento'])!.value,
      valor: this.editForm.get(['valor'])!.value,
      pago: this.editForm.get(['pago'])!.value,
      imovel: this.editForm.get(['imovel'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContasPagar>>): void {
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
