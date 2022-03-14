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
      image_url: null,
      part_category_id: partCategory.part_category_id,
    });

    expect(part.name).toBe(createdPartName);
  });

  it('creates part with default generated quantity to 1 without specifying', async () => {
    const createdPartName = 'created part 3';
    const part = await partsService.createPart({
      name: createdPartName,
      image_url: null,
      part_category_id: partCategory.part_category_id,
    });

    expect(part.default_generated_quantity).toBe(1);
  });

  it('creates part with default generated quantity to 2', async () => {
    const createdPartName = 'created part 4';
    const part = await partsService.createPart({
      name: createdPartName,
      image_url: null,
      part_category_id: partCategory.part_category_id,
      default_generated_quantity: 2,
    });

    expect(part.default_generated_quantity).toBe(2);
  });

  it('gets part', async () => {
    const getPartName = 'Part 1';
    const part = await partsService.createPart({
      name: getPartName,
      image_url: null,
      part_category_id: partCategory.part_category_id,
    });

    const getPart = await partsService.getPart(part.part_id);

    expect(getPart.name).toBe(getPartName);
  });

  it('updates part name', async () => {
    const part = await partsService.createPart({
      name: 'updated part 3',
      image_url: null,
      part_category_id: partCategory.part_category_id,
    });

    const updatedName = 'updated part zxc 1';
    const updatedPart = await partsService.updatePart(part.part_id, {
      name: updatedName,
      part_category_id: part.part_category_id,
    });

    expect(updatedPart.name).toBe(updatedName);
  });

  it('fails when part doesnt exist', async () => {
    const veryBigId = 100000000;

    await expect(async () => {
      await partsService.updatePart(veryBigId, {
        name: 'Part 2 baby',
        part_category_id: partCategory.part_category_id,
      });
    }).rejects.toThrow(/not found/i);
  });

  it('get parts', async () => {
    const partName1 = 'get parts name 1';
    await partsService.createPart({
      name: partName1,
      image_url: null,
      part_category_id: partCategory.part_category_id,
    });

    const partName2 = 'get parts name 2';
    await partsService.createPart({
      name: partName2,
      image_url: null,
      part_category_id: partCategory.part_category_id,
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
      image_url: null,
      part_category_id: partCategory.part_category_id,
    });

    const partComponent2 = await partsService.createPart({
      name: 'get part components name 1',
      image_url: null,
      part_category_id: partCategory.part_category_id,
    });

    const partParent = await partsService.createPart({
      name: 'get part components parent name 1',
      image_url: null,
      part_category_id: partCategory.part_category_id,
    });

    const partComponent1RequiredQuantity = 1;
    await partAssignmentsService.assignComponent({
      required_quantity: 1,
      parent_id: partParent.part_id,
      component_id: partComponent1.part_id,
    });

    const partComponent2RequiredQuantity = 3;
    await partAssignmentsService.assignComponent({
      required_quantity: partComponent2RequiredQuantity,
      parent_id: partParent.part_id,
      component_id: partComponent2.part_id,
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
        expect.objectContaining({
          component: expect.objectContaining({
            name: expect.stringMatching(partComponent2.name),
          }),
          required_quantity: partComponent2RequiredQuantity,
        }),
      ]),
    );
  });
});
