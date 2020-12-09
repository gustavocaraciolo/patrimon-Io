import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'imovel',
        loadChildren: () => import('./imovel/imovel.module').then(m => m.PatrimonIoImovelModule),
      },
      {
        path: 'investimento',
        loadChildren: () => import('./investimento/investimento.module').then(m => m.PatrimonIoInvestimentoModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class PatrimonIoEntityModule {}
