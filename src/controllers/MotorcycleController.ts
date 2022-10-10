import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { IMotorcycle } from '../interfaces/IMotorcycle';

export default class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) { }

  public async createMotorcycle(req: Request & { body: IMotorcycle }, res: Response<IMotorcycle>) {
    const {
      model,
      year,
      color,
      buyValue,
      category,
      engineCapacity,
    } = req.body;
    const motorcycle = {
      model,
      year,
      color,
      buyValue,
      category,
      engineCapacity,
    };
    const motorcycleCreated = await this._service.create(motorcycle);
    return res.status(201).json(motorcycleCreated);
  }

  public async getMotorcycles(_req: Request & { body: IMotorcycle }, res: Response<IMotorcycle[]>) {
    const motorcycles = await this._service.read();
    return res.status(200).json(motorcycles);
  }
}