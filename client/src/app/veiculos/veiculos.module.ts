import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { VeiculosRoutingModule } from "./veiculos-routing.module";
import { ListagemComponent } from "./pages/listagem/listagem.component";
import { FormComponent } from "./pages/form/form.component";

@NgModule({
  declarations: [ListagemComponent, FormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VeiculosRoutingModule,
  ],
  exports: [],
})
export class VeiculosModule {}
