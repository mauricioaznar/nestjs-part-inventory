import { INestApplication } from '@nestjs/common';
import { setupApp } from '../../common/__tests__/helpers/setup-app';
import { PartCategoriesService } from './part-categories.service';
import { PartsService } from '../parts/parts.service';

describe('part category', () => {
  let app: INestApplication;
  let partCategoriesService: PartCategoriesService;
  let partsService: PartsService;

  beforeEach(async () => {
    app = await setupApp();
    partCategoriesService = app.get(PartCategoriesService);
    partsService = app.get(PartsService);
  });

  afterEach(async () => {
    await app.close();
  });

  it('creates a category', async () => {
    const category = await partCategoriesService.addCategory({
      name: 'Category 1',
    });

    expect(category.name).toBe('Category 1');
  });

  it('fails when category name is already occupied', async () => {
    const firstCategory = await partCategoriesService.addCategory({
      name: 'Category 2',
    });

    expect(firstCategory.name).toBe('Category 2');

    await expect(async () => {
      await partCategoriesService.addCategory({
        name: 'Category 2',
      });
    }).rejects.toThrow(/category already exists/i);
  });

  it('lists all categories created', async () => {
    await partCategoriesService.addCategory({
      name: 'Category 4',
    });
    await partCategoriesService.addCategory({
      name: 'Category 5',
    });

    const categories = await partCategoriesService.getPartCategories();

    expect(categories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.stringMatching(/category 4/i),
        }),
        expect.objectContaining({
          name: expect.stringMatching(/category 5/i),
        }),
      ]),
    );
  });

  it('list category parts', async () => {
    const partCategory = await partCategoriesService.addCategory({
      name: 'Category 7',
    });

    await partsService.createPart({
      name: 'part created in part category test',
      image_url: null,
      part_category_id: partCategory.part_category_id,
    });

    const partsOfCategory = await partCategoriesService.getParts(partCategory);

    expect(partsOfCategory).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.stringMatching(/part created in part category test/i),
        }),
      ]),
    );
  });
});
