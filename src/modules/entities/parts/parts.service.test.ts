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
    const createdPartName = 'created part 2';
    const part = await partsService.createPart({
      name: createdPartName,
      image_url: null,
      part_category_id: partCategory.part_category_id,
    });

    expect(part.name).toBe(createdPartName);
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
});
