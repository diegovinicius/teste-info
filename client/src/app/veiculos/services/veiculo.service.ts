import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IVeiculo } from '../models/veiculo.model';

@Injectable({ providedIn: 'root' })
export class VeiculoService {
  private readonly baseUrl = `${environment.apiBaseUrl}/veiculos`;

  constructor(private readonly http: HttpClient) {}

  /**
   * Busca a lista de veículos cadastrados
   * @returns Lista de veículos
   */
  public getAll(): Observable<IVeiculo[]> {
    return this.http.get<IVeiculo[]>(this.baseUrl);
  }

  /**
   * Busca um veículo pelo id fornecido
   * @param id Número
   * @returns Veículo
   */
  public get(id: number): Observable<IVeiculo> {
    return this.http.get<IVeiculo>(`${this.baseUrl}/${id}`);
  }

  /**
   * Cria um novo veículo no banco de dados
   * @param payload IVeiculo
   */
  public create(payload: Omit<IVeiculo, 'id'>): Observable<IVeiculo> {
    return this.http.post<IVeiculo>(this.baseUrl, payload);
  }

  /**
   * Atualiza os dados de um veículo
   * @param payload IVeiculo
   */
  public update(payload: IVeiculo): Observable<IVeiculo> {
    if (!payload.id) throw new Error('ID é obrigatório para atualizar');
    return this.http.put<IVeiculo>(`${this.baseUrl}/${payload.id}`, payload);
  }

  /**
   * Remove um veídulo do banco de dados
   * @param id Número
   */
  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
