import { INestApplication } from '@nestjs/common';
import { PartCategoriesService } from '../../../entities/part-categories/part-categories.service';
import { PartsService } from '../../../entities/parts/parts.service';
import { PartAssignmentsService } from './part-assignments.service';
import { setupApp } from '../../__tests__/helpers/setup-app';

describe('part assignment', () => {
  let app: INestApplication;
  let partCategoriesService: PartCategoriesService;
  let partsService: PartsService;
  let partAssignmentsService: PartAssignmentsService;
  let partCategory;

  beforeAll(async () => {
    app = await setupApp();
    partCategoriesService = app.get(PartCategoriesService);
    partsService = app.get(PartsService);
    partAssignmentsService = app.get(PartAssignmentsService);
    partCategory = await partCategoriesService.addCategory({
      name: 'part category created in part assignment test',
    });
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await app.close();
  });

  it('get part assignment components', async () => {
    const partComponent1 = await partsService.createPart({
      name: 'part component in part assignment in 1',
      image_url: null,
      part_category_id: partCategory.part_category_id,
    });

    const partParent = await partsService.createPart({
      name: 'part parent in part assignment 1',
      image_url: null,
      part_category_id: partCategory.part_category_id,
    });

    const partComponent1RequiredQuantity = 1;
    await partAssignmentsService.assignComponent({
      required_quantity: partComponent1RequiredQuantity,
      parent_id: partParent.part_id,
      component_id: partComponent1.part_id,
    });

    const components = await partsService.getComponents(partParent);

    expect(components).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          component: expect.objectContaining({
            name: expect.stringMatching(partComponent1.name),
          }),
          required_quantity: partComponent1RequiredQuantity,
        }),
      ]),
    );
  });

  it('fails to assign component when it already has been assigned', async () => {
    const partComponent1 = await partsService.createPart({
      name: 'part component in part assignment in 1',
      image_url: null,
      part_category_id: partCategory.part_category_id,
    });

    const partParent = await partsService.createPart({
      name: 'part parent in part assignment 1',
      image_url: null,
      part_category_id: partCategory.part_category_id,
    });

    await partAssignmentsService.assignComponent({
      required_quantity: 1,
      parent_id: partParent.part_id,
      component_id: partComponent1.part_id,
    });

    await expect(async () => {
      await partAssignmentsService.assignComponent({
        required_quantity: 1,
        parent_id: partParent.part_id,
        component_id: partComponent1.part_id,
      });
    }).rejects.toThrow(/has been already assigned/i);
  });
});
