import { INestApplication } from '@nestjs/common';
import { setupApp } from '../../common/__tests__/helpers/setup-app';
import { PartCategoriesService } from './part-categories.service';

describe('part category', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await setupApp();
  });

  it('creates a category', async () => {
    const partCategoryService = app.get(PartCategoriesService);

    const category = await partCategoryService.addCategory({
      name: 'Category 1',
    });

    expect(category.name).toBe('Category 1');
  });
});
