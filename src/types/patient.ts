export interface Patient {
  key?: string;
  name: string;
  admittedAt: string;
  gender: number;
  bloodgrp: number;
  age: number;
  address?: string;
  phoneNumber: string;
  priority: number;
  note?: string;
  pints?: number;
}
