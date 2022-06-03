import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculateOffsetService {
  public calculateOffset(page: number, limit: number): number {
    const offset = limit * (page - 1);

    return offset;
  }
}
