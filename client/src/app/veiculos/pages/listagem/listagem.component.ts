import { Component, OnInit } from "@angular/core";

import { IVeiculo } from "../../models/veiculo.model";
import { VeiculoService } from "../../services/veiculo.service";

@Component({
  selector: "app-listagem",
  templateUrl: "./listagem.component.html",
  styleUrl: "./listagem.component.scss",
})
export class ListagemComponent implements OnInit {
  public veiculos: IVeiculo[] = [];
  public loading = false;
  public error: string | null = null;

  constructor(private readonly _service: VeiculoService) {}

  public ngOnInit(): void {
    this.load();
  }

  public load(): void {
    this.loading = true;
    this.error = null;
    this._service.getAll().subscribe({
      next: (data) => (this.veiculos = data),
      error: () => (this.error = "Falha ao carregar veiculos"),
      complete: () => (this.loading = false),
    });
  }

  public remove(id?: number): void {
    if (!id) return;
    this._service.delete(id).subscribe({
      next: () => this.load(),
      error: () => (this.error = "Falha ao excluir"),
    });
  }
}
