import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { setupApp } from '../../common/__tests__/helpers/setup-app';
import { getAdminToken } from '../../common/__tests__/helpers/get-token';

describe('Part categories resolver', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await setupApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('fails to create a part category when user is not logged in', async () => {
    const categoryName = 'random category name 123123';
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
            addCategory(
              partCategoryInput: {name: "${categoryName}"})
                {
                  name
                }
              }`,
      });

    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: expect.stringMatching(/unauthorized/i),
        }),
      ]),
    );
  });

  it('creates a part category when user is logged in', async () => {
    const categoryName = 'random category name 123123';
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set(await getAdminToken(app))
      .send({
        query: `mutation {
            addCategory(
              partCategoryInput: {name: "${categoryName}"})
                {
                  name
                }
              }`,
      });

    expect(response.body?.data?.addCategory).toEqual(
      expect.objectContaining({
        name: expect.stringMatching(/random category name/i),
      }),
    );
  });
});
