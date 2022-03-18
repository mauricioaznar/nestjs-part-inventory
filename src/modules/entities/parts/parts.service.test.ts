import { INestApplication } from '@nestjs/common';
import { setupApp } from '../../common/__tests__/helpers/setup-app';
import { PartCategoriesService } from '../part-categories/part-categories.service';
import { PartsService } from './parts.service';
import { PartAssignmentsService } from '../../common/services/entities/part-assignments.service';

describe('part service', () => {
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
      name: 'part category created in part test',
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('creates part', async () => {
    const createdPartName = 'created part 2';
    const part = await partsService.createPart({
      name: createdPartName,
      imageUrl: null,
      partCategoryId: partCategory.partCategoryId,
    });

    expect(part.name).toBe(createdPartName);
  });

  it('creates part with default generated quantity to 1 without specifying', async () => {
    const createdPartName = 'created part 3';
    const part = await partsService.createPart({
      name: createdPartName,
      imageUrl: null,
      partCategoryId: partCategory.partCategoryId,
    });

    expect(part.defaultGeneratedQuantity).toBe(1);
  });

  it('creates part with default generated quantity to 2', async () => {
    const createdPartName = 'created part 4';
    const part = await partsService.createPart({
      name: createdPartName,
      imageUrl: null,
      partCategoryId: partCategory.partCategoryId,
      defaultGeneratedQuantity: 2,
    });

    expect(part.defaultGeneratedQuantity).toBe(2);
  });

  it('gets part', async () => {
    const getPartName = 'Part 1';
    const part = await partsService.createPart({
      name: getPartName,
      imageUrl: null,
      partCategoryId: partCategory.partCategoryId,
    });

    const getPart = await partsService.getPart(part.partId);

    expect(getPart.name).toBe(getPartName);
  });

  it('updates part name', async () => {
    const part = await partsService.createPart({
      name: 'updated part 3',
      imageUrl: null,
      partCategoryId: partCategory.partCategoryId,
    });

    const updatedName = 'updated part zxc 1';
    const updatedPart = await partsService.updatePart(part.partId, {
      name: updatedName,
      partCategoryId: part.partCategoryId,
    });

    expect(updatedPart.name).toBe(updatedName);
  });

  it('fails when part doesnt exist', async () => {
    const veryBigId = 100000000;

    await expect(async () => {
      await partsService.updatePart(veryBigId, {
        name: 'Part 2 baby',
        partCategoryId: partCategory.partCategoryId,
      });
    }).rejects.toThrow(/not found/i);
  });

  it('get parts', async () => {
    const partName1 = 'get parts name 1';
    await partsService.createPart({
      name: partName1,
      imageUrl: null,
      partCategoryId: partCategory.partCategoryId,
    });

    const partName2 = 'get parts name 2';
    await partsService.createPart({
      name: partName2,
      imageUrl: null,
      partCategoryId: partCategory.partCategoryId,
    });

    const parts = await partsService.getParts();

    expect(parts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.stringMatching(partName1),
        }),
        expect.objectContaining({
          name: expect.stringMatching(partName2),
        }),
      ]),
    );
  });

  it('get part components', async () => {
    const partComponent1 = await partsService.createPart({
      name: 'get part components name 1',
      imageUrl: null,
      partCategoryId: partCategory.partCategoryId,
    });

    const partComponent2 = await partsService.createPart({
      name: 'get part components name 1',
      imageUrl: null,
      partCategoryId: partCategory.partCategoryId,
    });

    const partParent = await partsService.createPart({
      name: 'get part components parent name 1',
      imageUrl: null,
      partCategoryId: partCategory.partCategoryId,
    });

    const partComponent1RequiredQuantity = 1;
    await partAssignmentsService.assignComponent({
      requiredQuantity: 1,
      parentId: partParent.partId,
      componentId: partComponent1.partId,
    });

    const partComponent2RequiredQuantity = 3;
    await partAssignmentsService.assignComponent({
      requiredQuantity: partComponent2RequiredQuantity,
      parentId: partParent.partId,
      componentId: partComponent2.partId,
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
        expect.objectContaining({
          component: expect.objectContaining({
            name: expect.stringMatching(partComponent2.name),
          }),
          requiredQuantity: partComponent2RequiredQuantity,
        }),
      ]),
    );
  });

  it('get part parents', async () => {
    const partComponent = await partsService.createPart({
      name: 'get part parents component name 1',
      imageUrl: null,
      partCategoryId: partCategory.partCategoryId,
    });

    const partParent1 = await partsService.createPart({
      name: 'get part parents parent name 1',
      imageUrl: null,
      partCategoryId: partCategory.partCategoryId,
    });

    const partParent2 = await partsService.createPart({
      name: 'get part parents parent name 2',
      imageUrl: null,
      partCategoryId: partCategory.partCategoryId,
    });

    const partComponent1RequiredQuantity = 1;
    await partAssignmentsService.assignComponent({
      requiredQuantity: 1,
      parentId: partParent1.partId,
      componentId: partComponent.partId,
    });

    const partComponent2RequiredQuantity = 3;
    await partAssignmentsService.assignComponent({
      requiredQuantity: partComponent2RequiredQuantity,
      parentId: partParent2.partId,
      componentId: partComponent.partId,
    });

    const parents = await partsService.getParentAssignments(partComponent);

    expect(parents).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          parent: expect.objectContaining({
            name: expect.stringMatching(partParent1.name),
          }),
          requiredQuantity: partComponent1RequiredQuantity,
        }),
        expect.objectContaining({
          parent: expect.objectContaining({
            name: expect.stringMatching(partParent2.name),
          }),
          requiredQuantity: partComponent2RequiredQuantity,
        }),
      ]),
    );
  });
});
