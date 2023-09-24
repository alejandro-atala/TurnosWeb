import { Test, TestingModule } from '@nestjs/testing';
import { ValoresController } from './valores.controller';
import { ValoresService } from './valores.service';

describe('ValoresController', () => {
  let controller: ValoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValoresController],
      providers: [ValoresService],
    }).compile();

    controller = module.get<ValoresController>(ValoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
