import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IAReceber, AReceber } from 'app/shared/model/a-receber.model';
import { AReceberService } from './a-receber.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-a-receber-update',
  templateUrl: './a-receber-update.component.html',
})
export class AReceberUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  dtRecebidoDp: any;
  dtRecebimentoDp: any;

  editForm = this.fb.group({
    id: [],
    dtRecebido: [],
    dtRecebimento: [],
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
    protected aReceberService: AReceberService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ aReceber }) => {
      this.updateForm(aReceber);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(aReceber: IAReceber): void {
    this.editForm.patchValue({
      id: aReceber.id,
      dtRecebido: aReceber.dtRecebido,
      dtRecebimento: aReceber.dtRecebimento,
      valor: aReceber.valor,
      moeda: aReceber.moeda,
      descricao: aReceber.descricao,
      status: aReceber.status,
      comprovantePagamento: aReceber.comprovantePagamento,
      comprovantePagamentoContentType: aReceber.comprovantePagamentoContentType,
      imovel: aReceber.imovel,
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
    const aReceber = this.createFromForm();
    if (aReceber.id !== undefined) {
      this.subscribeToSaveResponse(this.aReceberService.update(aReceber));
    } else {
      this.subscribeToSaveResponse(this.aReceberService.create(aReceber));
    }
  }

  private createFromForm(): IAReceber {
    return {
      ...new AReceber(),
      id: this.editForm.get(['id'])!.value,
      dtRecebido: this.editForm.get(['dtRecebido'])!.value,
      dtRecebimento: this.editForm.get(['dtRecebimento'])!.value,
      valor: this.editForm.get(['valor'])!.value,
      moeda: this.editForm.get(['moeda'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      status: this.editForm.get(['status'])!.value,
      comprovantePagamentoContentType: this.editForm.get(['comprovantePagamentoContentType'])!.value,
      comprovantePagamento: this.editForm.get(['comprovantePagamento'])!.value,
      imovel: this.editForm.get(['imovel'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAReceber>>): void {
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
