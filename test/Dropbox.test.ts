import supertest from "supertest";
import Ajv from 'ajv';
const ajv = new Ajv({ strict: false })

const rootURL = `http://localhost:5500`;
const prefix = `/api/v1/droopie`;

const server = rootURL + prefix;
export const request = supertest(server);


const FileRecordSchema = {
  type: "object",
  properties: {
    file_id: { type: "string" },
    dropbox_file_id: { type: "string" },
    file_name: { type: "string" },
    file_path: { type: "string" },
    url: { type: "string" },
    dropbox_updated_at: { type: "string" },
    visit_count: { type: "string" },
  },
  required: ["file_name", "url"],
  additionalProperties: true,
}

const paginatedSchema = {
  type: "object",
  properties: {
    limit: { type: "number" },
    offset: { type: "number" },
    count: { type: "string" },
    records: {
      type: "array",
      items: FileRecordSchema,
    },
  },
  required: ["records"],
  additionalProperties: false
}

const ErrorSchema = {
  type: "object",
  properties: {
    error: { type: "boolean" },
    message: { type: "string" },
  },
  required: ["error", "message",],
  additionalProperties: false,
}


describe.only('TESTING Dropbox CONTROLLER', () => {

  describe('Get All Files API', () => {
    const url = `/files`;
    // positive testings
    describe('positive testings', () => {
      it('get all files', async () => {
        const res = await request.get(url)
        expect([200, 201].includes(res.status)).toBe(true);
        expect(ajv.validate(paginatedSchema, res.body)).toBe(true);
      })

      it('searchKey working', async () => {
        const res = await request.get(url + `?searchKey=Get`)
        expect([200, 201].includes(res.status)).toBe(true);
        expect(ajv.validate(paginatedSchema, res.body)).toBe(true);
      })

      it('limit working', async () => {
        const res = await request.get(url + `?limit=99`)
        expect([200, 201].includes(res.status)).toBe(true);
        expect(ajv.validate(paginatedSchema, res.body)).toBe(true);
      })

      it('offset working', async () => {
        const res = await request.get(url + `?offset=7`)
        expect([200, 201].includes(res.status)).toBe(true);
        expect(ajv.validate(paginatedSchema, res.body)).toBe(true);
      })

      it('sort working', async () => {
        const res = await request.get(url + `?sort=file_name:desc`)
        expect([200, 201].includes(res.status)).toBe(true);
        expect(ajv.validate(paginatedSchema, res.body)).toBe(true);
      })

      it('sort param without sort type working', async () => {
        const res = await request.get(url + `?sort=dropbox_updated_at`)
        expect([200, 201].includes(res.status)).toBe(true);
        expect(ajv.validate(paginatedSchema, res.body)).toBe(true);
      })
    })

    // negative testing
    describe('negative testings', () => {
      it('limit is not a number', async () => {
        const res = await request.get(url + `?limit=1to100`)
        expect(ajv.validate(ErrorSchema, res.body)).toBe(true);
        expect(res.body.message).not.toBe('Error occurred while processing!');
      })

      it('offset is not a number', async () => {
        const res = await request.get(url + `?offset=1to100`)
        expect(ajv.validate(ErrorSchema, res.body)).toBe(true);
        expect(res.body.message).not.toBe('Error occurred while processing!');
      })

      it('limit is less than 0', async () => {
        const res = await request.get(url + `?limit=-1`)
        expect(ajv.validate(ErrorSchema, res.body)).toBe(true);
        expect(res.body.message).not.toBe('Error occurred while processing!');
      })

      it('offset is less than 0', async () => {
        const res = await request.get(url + `?offset=-1`)
        expect(ajv.validate(ErrorSchema, res.body)).toBe(true);
        expect(res.body.message).not.toBe('Error occurred while processing!');
      })

      it('limit is more than 100', async () => {
        const res = await request.get(url + `?limit=101`)
        expect(ajv.validate(ErrorSchema, res.body)).toBe(true);
        expect(res.body.message).not.toBe('Error occurred while processing!');
      })

      it('invalid sort request', async () => {
        const res = await request.get(url + `?sort=description:asc`)
        expect(ajv.validate(ErrorSchema, res.body)).toBe(true);
        expect(res.body.message).not.toBe('Error occurred while processing');
      })

      it('invalid sort type request', async () => {
        const res = await request.get(url + `?sort=file_name:ascending`)
        expect(ajv.validate(ErrorSchema, res.body)).toBe(true);
        expect(res.body.message).not.toBe('Error occurred while processing');
      })
    })
  })
})