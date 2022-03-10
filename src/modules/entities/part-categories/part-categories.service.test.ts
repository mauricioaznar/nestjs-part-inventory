import { INestApplication } from '@nestjs/common';
import { setupApp } from '../../common/__tests__/helpers/setup-app';
import { PartCategoriesService } from './part-categories.service';

describe('part category', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await setupApp();
  });

  afterEach(async () => {
    await app.close();
  });

  it('creates a category', async () => {
    const partCategoryService = app.get(PartCategoriesService);

    const category = await partCategoryService.addCategory({
      name: 'Category 1',
    });

    expect(category.name).toBe('Category 1');
  });

  it('fails when category name is already occupied', async () => {
    const partCategoryService = app.get(PartCategoriesService);

    const firstCategory = await partCategoryService.addCategory({
      name: 'Category 2',
    });

    expect(firstCategory.name).toBe('Category 2');

    await expect(async () => {
      await partCategoryService.addCategory({
        name: 'Category 2',
      });
    }).rejects.toThrow(/category already exists/i);
  });
});
