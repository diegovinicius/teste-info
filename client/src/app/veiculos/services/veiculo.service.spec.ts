import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VeiculoService } from './veiculo.service';
import { environment } from '../../../environments/environment';

describe('veiculoService', () => {
  let service: VeiculoService;
  let httpMock: HttpTestingController;

  const baseUrl = `${environment.apiBaseUrl}/veiculos`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(VeiculoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('deve listar veiculos (GET)', () => {
    service.getAll().subscribe();
    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('deve criar veiculo (POST)', () => {
    service.create({
      placa: 'ABC-1234', chassi: 'CH', renavam: 'RE', modelo: 'Civic', marca: 'Honda', ano: 2021
    }).subscribe();
    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    req.flush({ id: 1 });
  });

  it('deve atualizar veiculo (PUT)', () => {
    service.update({
      id: 10, placa: 'AAA-0000', chassi: 'X', renavam: 'Y', modelo: 'M', marca: 'B', ano: 2020
    }).subscribe();
    const req = httpMock.expectOne(`${baseUrl}/10`);
    expect(req.request.method).toBe('PUT');
    req.flush({ id: 10 });
  });

  it('deve excluir veiculo (DELETE)', () => {
    service.delete(7).subscribe();
    const req = httpMock.expectOne(`${baseUrl}/7`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
