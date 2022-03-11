import { INestApplication } from '@nestjs/common';
import { PartCategoriesService } from '../../../entities/part-categories/part-categories.service';
import { PartsService } from '../../../entities/parts/parts.service';
import { PartAssignmentsService } from './part-assignments.service';
import { setupApp } from '../../__tests__/helpers/setup-app';
import { PartInventoryService } from './part-inventory.service';
import { Part } from '../../dto/entities/parts.dto';

describe('part inventory', () => {
  let app: INestApplication;
  let partCategoriesService: PartCategoriesService;
  let partsService: PartsService;
  let partAssignmentsService: PartAssignmentsService;
  let partInventoryService: PartInventoryService;
  let partCategory;

  beforeAll(async () => {
    app = await setupApp();
    partCategoriesService = app.get(PartCategoriesService);
    partsService = app.get(PartsService);
    partAssignmentsService = app.get(PartAssignmentsService);
    partCategory = await partCategoriesService.addCategory({
      name: 'part category created in part inventory test',
    });
    partInventoryService = app.get(PartInventoryService);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await app.close();
  });

  async function createsPartWithoutComponents({
    uniqueName,
  }: {
    uniqueName: string;
  }): Promise<{ part: Part }> {
    const part = await partsService.createPart({
      name: `part in ${uniqueName}`,
      image_url: null,
      part_category_id: partCategory.part_category_id,
    });
    return {
      part: part,
    };
  }

  async function createsParentWithOneComponent({
    uniqueName,
    requiredComponentQuantity,
  }: {
    uniqueName: string;
    requiredComponentQuantity: number;
  }): Promise<{ parent: Part; component: Part }> {
    const partParent = await partsService.createPart({
      name: `part parent in ${uniqueName}`,
      image_url: null,
      part_category_id: partCategory.part_category_id,
    });

    const partComponent = await partsService.createPart({
      name: `part component ${uniqueName}`,
      image_url: null,
      part_category_id: partCategory.part_category_id,
    });

    await partAssignmentsService.assignComponent({
      required_quantity: requiredComponentQuantity,
      parent_id: partParent.part_id,
      component_id: partComponent.part_id,
    });

    const components = await partsService.getComponents(partParent);

    expect(components).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          component: expect.objectContaining({
            name: expect.stringMatching(partComponent.name),
          }),
          required_quantity: requiredComponentQuantity,
        }),
      ]),
    );

    return {
      parent: partParent,
      component: partComponent,
    };
  }

  it('initial current quantity must be 0', async () => {
    const { parent } = await createsParentWithOneComponent({
      uniqueName: 'parent inventory 1',
      requiredComponentQuantity: 1,
    });

    const currentParentQuantity = await partInventoryService.getCurrentQuantity(
      parent.part_id,
    );

    expect(currentParentQuantity).toBe(0);
  });

  it('fails to add when a parent has a component', async () => {
    const { parent } = await createsParentWithOneComponent({
      uniqueName: 'parent inventory 1',
      requiredComponentQuantity: 1,
    });

    const currentParentQuantity = await partInventoryService.getCurrentQuantity(
      parent.part_id,
    );

    expect(currentParentQuantity).toBe(0);

    await expect(async () => {
      await partInventoryService.add(parent.part_id);
    }).rejects.toThrow(/cannot be added, it must be crafted/i);
  });

  it('fails to add when part doesnt exist', async () => {
    const veryLargeNonexistentId = 1003003000;

    await expect(async () => {
      await partInventoryService.add(veryLargeNonexistentId);
    }).rejects.toThrow(/part not found/i);
  });

  it('adds when part doesnt have a component', async () => {
    const { part } = await createsPartWithoutComponents({
      uniqueName: 'part inventory 2',
    });

    const currentQuantity = await partInventoryService.getCurrentQuantity(
      part.part_id,
    );

    expect(currentQuantity).toBe(0);

    await partInventoryService.add(part.part_id);
    await partInventoryService.add(part.part_id);

    const newCurrentQuantity = await partInventoryService.getCurrentQuantity(
      part.part_id,
    );

    expect(newCurrentQuantity).toBe(2);
  });

  it('fails to craft when part is not found', async () => {
    const veryLargeNonexistentId = 1002303000;

    await expect(async () => {
      await partInventoryService.craft(veryLargeNonexistentId);
    }).rejects.toThrow(/part not found/i);
  });

  it('fails to craft when a part is without component(s)', async () => {
    const { part } = await createsPartWithoutComponents({
      uniqueName: 'part inventory 2',
    });

    await expect(async () => {
      await partInventoryService.craft(part.part_id);
    }).rejects.toThrow(/cannot be crafted/i);
  });

  it('fails to craft when a part doesnt have enough component', async () => {
    const { parent, component } = await createsParentWithOneComponent({
      uniqueName: 'part inventory 3',
      requiredComponentQuantity: 2,
    });

    await expect(async () => {
      await partInventoryService.craft(parent.part_id);
    }).rejects.toThrow(/not enough/i);

    await partInventoryService.add(component.part_id);

    const currentComponentQuantity =
      await partInventoryService.getCurrentQuantity(component.part_id);

    expect(currentComponentQuantity).toBe(1);

    await expect(async () => {
      await partInventoryService.craft(parent.part_id);
    }).rejects.toThrow(/not enough/i);
  });

  it('crafts a part has enough components', async () => {
    const { parent, component } = await createsParentWithOneComponent({
      uniqueName: 'part inventory 4',
      requiredComponentQuantity: 2,
    });

    await expect(async () => {
      await partInventoryService.craft(parent.part_id);
    }).rejects.toThrow(/not enough/i);

    await partInventoryService.add(component.part_id);
    await partInventoryService.add(component.part_id);

    const currentComponentQuantity =
      await partInventoryService.getCurrentQuantity(component.part_id);

    expect(currentComponentQuantity).toBe(2);

    await expect(
      partInventoryService.craft(parent.part_id),
    ).resolves.not.toThrow();
  });

  it('crafts, reduces component quantity once crafted and adds to 1 to parent part', async () => {
    const { parent, component } = await createsParentWithOneComponent({
      uniqueName: 'part inventory 5',
      requiredComponentQuantity: 2,
    });

    await expect(async () => {
      await partInventoryService.craft(parent.part_id);
    }).rejects.toThrow(/not enough/i);

    await partInventoryService.add(component.part_id);
    await partInventoryService.add(component.part_id);

    const currentComponentQuantity =
      await partInventoryService.getCurrentQuantity(component.part_id);

    expect(currentComponentQuantity).toBe(2);

    await expect(
      partInventoryService.craft(parent.part_id),
    ).resolves.not.toThrow();

    const newCurrentComponentQuantity =
      await partInventoryService.getCurrentQuantity(component.part_id);

    expect(newCurrentComponentQuantity).toBe(0);

    const currentParentQuantity = await partInventoryService.getCurrentQuantity(
      parent.part_id,
    );

    expect(currentParentQuantity).toBe(1);
  });
});
