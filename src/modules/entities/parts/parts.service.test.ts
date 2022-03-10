import { INestApplication } from '@nestjs/common';
import { setupApp } from '../../common/__tests__/helpers/setup-app';
import { PartCategoriesService } from '../part-categories/part-categories.service';
import { PartsService } from './parts.service';

describe('part category', () => {
  let app: INestApplication;
  let partCategoriesService: PartCategoriesService;
  let partsService: PartsService;
  let partCategory;

  beforeAll(async () => {
    app = await setupApp();
    partCategoriesService = app.get(PartCategoriesService);
    partsService = app.get(PartsService);
    partCategory = await partCategoriesService.addCategory({
      name: 'part category created in part test',
    });
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await app.close();
  });

  it('creates part', async () => {
    const part = await partsService.createPart({
      name: 'Part 1',
      image_url: null,
      part_category_id: partCategory.part_category_id,
    });

    expect(part.name).toBe('Part 1');
  });
});
