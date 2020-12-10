import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IImovel, Imovel } from 'app/shared/model/imovel.model';
import { ImovelService } from './imovel.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-imovel-update',
  templateUrl: './imovel-update.component.html',
})
export class ImovelUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  dtInicialPagamentoDp: any;
  dtFinalPagamentoDp: any;
  diaPreferencialPgmtDp: any;

  editForm = this.fb.group({
    id: [],
    nome: [],
    projeto: [],
    projetoContentType: [],
    tabelaPreco: [],
    tabelaPrecoContentType: [],
    contrato: [],
    contratoContentType: [],
    valorTotal: [],
    dtInicialPagamento: [],
    dtFinalPagamento: [],
    diaPreferencialPgmt: [],
    user: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected imovelService: ImovelService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ imovel }) => {
      this.updateForm(imovel);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(imovel: IImovel): void {
    this.editForm.patchValue({
      id: imovel.id,
      nome: imovel.nome,
      projeto: imovel.projeto,
      projetoContentType: imovel.projetoContentType,
      tabelaPreco: imovel.tabelaPreco,
      tabelaPrecoContentType: imovel.tabelaPrecoContentType,
      contrato: imovel.contrato,
      contratoContentType: imovel.contratoContentType,
      valorTotal: imovel.valorTotal,
      dtInicialPagamento: imovel.dtInicialPagamento,
      dtFinalPagamento: imovel.dtFinalPagamento,
      diaPreferencialPgmt: imovel.diaPreferencialPgmt,
      user: imovel.user,
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
    const imovel = this.createFromForm();
    if (imovel.id !== undefined) {
      this.subscribeToSaveResponse(this.imovelService.update(imovel));
    } else {
      this.subscribeToSaveResponse(this.imovelService.create(imovel));
    }
  }

  private createFromForm(): IImovel {
    return {
      ...new Imovel(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      projetoContentType: this.editForm.get(['projetoContentType'])!.value,
      projeto: this.editForm.get(['projeto'])!.value,
      tabelaPrecoContentType: this.editForm.get(['tabelaPrecoContentType'])!.value,
      tabelaPreco: this.editForm.get(['tabelaPreco'])!.value,
      contratoContentType: this.editForm.get(['contratoContentType'])!.value,
      contrato: this.editForm.get(['contrato'])!.value,
      valorTotal: this.editForm.get(['valorTotal'])!.value,
      dtInicialPagamento: this.editForm.get(['dtInicialPagamento'])!.value,
      dtFinalPagamento: this.editForm.get(['dtFinalPagamento'])!.value,
      diaPreferencialPgmt: this.editForm.get(['diaPreferencialPgmt'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IImovel>>): void {
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
