import { INestApplication } from '@nestjs/common';
import { setupApp } from '../../common/__tests__/helpers/setup-app';
import { PartCategoriesService } from '../part-categories/part-categories.service';
import { PartsService } from './parts.service';

describe('part service', () => {
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

  it('updates part name', async () => {
    const part = await partsService.createPart({
      name: 'Part 2',
      image_url: null,
      part_category_id: partCategory.part_category_id,
    });

    const updatedPart = await partsService.updatePart(part.part_id, {
      name: 'Part 2 baby',
      part_category_id: part.part_category_id,
    });

    expect(updatedPart.name).toBe('Part 2 baby');
  });

  it('fails when part doesnt exist', async () => {
    const veryBigId = 1000000;

    await expect(async () => {
      await partsService.updatePart(veryBigId, {
        name: 'Part 2 baby',
        part_category_id: partCategory.part_category_id,
      });
    }).rejects.toThrow(/not found/i);
  });
});
