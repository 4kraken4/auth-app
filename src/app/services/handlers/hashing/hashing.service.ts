import { Injectable } from '@angular/core';
import * as bcrypt from 'bcrypt';

@Injectable({
  providedIn: 'root',
})
export class HashingService {
  private saltRounds = 10;

  constructor() {}

  async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(this.saltRounds);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (error) {
      throw error;
    }
  }
}
