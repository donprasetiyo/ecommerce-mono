import { Test, TestingModule } from '@nestjs/testing';
import { AIModelService } from './ai-model.service';

describe('AIModelService', () => {
  let service: AIModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AIModelService],
    }).compile();

    service = module.get<AIModelService>(AIModelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
