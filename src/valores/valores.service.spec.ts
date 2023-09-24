import { Test, TestingModule } from '@nestjs/testing';
import { ValoresService } from './valores.service';

describe('ValoresService', () => {
  let service: ValoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValoresService],
    }).compile();

    service = module.get<ValoresService>(ValoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
