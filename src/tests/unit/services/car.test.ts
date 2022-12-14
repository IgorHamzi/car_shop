import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarModel from '../../../models/Car';
import CarService from '../../../services/CarService';
import { carMock, carMockWithId } from '../../mocks/carMock';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'read').resolves([carMock]);
    sinon.stub(carModel, 'readOne')
        .onCall(0).resolves(carMockWithId)
        .onCall(1).resolves(null)
        .onCall(2).resolves(carMockWithId)
    sinon.stub(carModel, 'update').resolves(carMockWithId)
  });

  after(()=>{
    sinon.restore();
  })

  describe('Create Car', () => {
    it('sucess', async () => {
      const carCreate = await carService.create(carMock);

      expect(carCreate).to.be.deep.equal(carMockWithId);
    })
    it('Failure', async () => {
      try {
        await carService.create({} as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    })
  });

  describe('Read Cars', () => {
    it('sucess', async () => {
      const cars = await carService.read();

    expect(cars).to.be.deep.equal([carMock]);
    });
  });

  describe('readOne Car', () => {
    it('sucess', async () => {
      const car = await carService.readOne(carMockWithId._id);

    expect(car).to.be.deep.equal(carMockWithId);
    });

    it('failure', async () => {
      try {
        await carService.readOne(carMockWithId._id);
      } catch (error:any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
      }
    })
  });

  describe('Update Car', () => {
		it('Success', async () => {
			const carUpdated = await carService.update('62cf1fc6498565d94eba52cd', carMock);
			expect(carUpdated).to.be.deep.equal(carMockWithId);
		});
	});
});