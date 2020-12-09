import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IAPagar, APagar } from 'app/shared/model/a-pagar.model';
import { APagarService } from './a-pagar.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-a-pagar-update',
  templateUrl: './a-pagar-update.component.html',
})
export class APagarUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  dtPagamentoDp: any;
  dtVencimentoDp: any;

  editForm = this.fb.group({
    id: [],
    dtPagamento: [],
    dtVencimento: [],
    valor: [],
    moeda: [],
    descricao: [],
    status: [],
    comprovantePagamento: [],
    comprovantePagamentoContentType: [],
    imovel: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected aPagarService: APagarService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ aPagar }) => {
      this.updateForm(aPagar);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(aPagar: IAPagar): void {
    this.editForm.patchValue({
      id: aPagar.id,
      dtPagamento: aPagar.dtPagamento,
      dtVencimento: aPagar.dtVencimento,
      valor: aPagar.valor,
      moeda: aPagar.moeda,
      descricao: aPagar.descricao,
      status: aPagar.status,
      comprovantePagamento: aPagar.comprovantePagamento,
      comprovantePagamentoContentType: aPagar.comprovantePagamentoContentType,
      imovel: aPagar.imovel,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('patrimonIoApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const aPagar = this.createFromForm();
    if (aPagar.id !== undefined) {
      this.subscribeToSaveResponse(this.aPagarService.update(aPagar));
    } else {
      this.subscribeToSaveResponse(this.aPagarService.create(aPagar));
    }
  }

  private createFromForm(): IAPagar {
    return {
      ...new APagar(),
      id: this.editForm.get(['id'])!.value,
      dtPagamento: this.editForm.get(['dtPagamento'])!.value,
      dtVencimento: this.editForm.get(['dtVencimento'])!.value,
      valor: this.editForm.get(['valor'])!.value,
      moeda: this.editForm.get(['moeda'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      status: this.editForm.get(['status'])!.value,
      comprovantePagamentoContentType: this.editForm.get(['comprovantePagamentoContentType'])!.value,
      comprovantePagamento: this.editForm.get(['comprovantePagamento'])!.value,
      imovel: this.editForm.get(['imovel'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAPagar>>): void {
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

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
