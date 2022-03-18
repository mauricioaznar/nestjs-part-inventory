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

  it('get part assignment components', async () => {
    const partComponent1 = await partsService.createPart({
      name: 'part component in get part assignment 1',
      imageUrl: null,
      partCategoryId: partCategory.partCategoryId,
    });

    const partParent = await partsService.createPart({
      name: 'part parent in get part assignment 1',
      imageUrl: null,
      partCategoryId: partCategory.partCategoryId,
    });

    const partComponent1RequiredQuantity = 1;
    await partAssignmentsService.assignComponent({
      requiredQuantity: partComponent1RequiredQuantity,
      parentId: partParent.part_id,
      componentId: partComponent1.part_id,
    });

    const components = await partsService.getComponentAssignments(partParent);

    expect(components).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          component: expect.objectContaining({
            name: expect.stringMatching(partComponent1.name),
          }),
          requiredQuantity: partComponent1RequiredQuantity,
        }),
      ]),
    );
  });

  it('fails to assign component when it already has been assigned', async () => {
    const partComponent1 = await partsService.createPart({
      name: 'part component in has already been assigned 1',
      imageUrl: null,
      partCategoryId: partCategory.partCategoryId,
    });

    const partParent = await partsService.createPart({
      name: 'part component in has already been assigned 2',
      imageUrl: null,
      partCategoryId: partCategory.partCategoryId,
    });

    await partAssignmentsService.assignComponent({
      requiredQuantity: 1,
      parentId: partParent.part_id,
      componentId: partComponent1.part_id,
    });

    await expect(async () => {
      await partAssignmentsService.assignComponent({
        requiredQuantity: 1,
        parentId: partParent.part_id,
        componentId: partComponent1.part_id,
      });
    }).rejects.toThrow(/has been already assigned to/i);
  });

  it('fails to assign component when parent has already 4 components assigned', async () => {
    const partParent = await partsService.createPart({
      name: 'part parent in max component 1',
      imageUrl: null,
      partCategoryId: partCategory.partCategoryId,
    });

    for (const number in Array.from(Array(4))) {
      const partComponent = await partsService.createPart({
        name: `part component in max component ${number + 1}`,
        imageUrl: null,
        partCategoryId: partCategory.partCategoryId,
      });

      await partAssignmentsService.assignComponent({
        requiredQuantity: 1,
        parentId: partParent.part_id,
        componentId: partComponent.part_id,
      });
    }

    const partComponent5 = await partsService.createPart({
      name: 'part component in max component 5',
      imageUrl: null,
      partCategoryId: partCategory.partCategoryId,
    });

    await expect(async () => {
      await partAssignmentsService.assignComponent({
        requiredQuantity: 1,
        parentId: partParent.part_id,
        componentId: partComponent5.part_id,
      });
    }).rejects.toThrow(/max component assignment reached/i);
  });
});
