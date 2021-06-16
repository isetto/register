import { TestBed } from '@angular/core/testing';

import { ValidatorService } from './validator.service';

describe('ValidatorService', () => {
  let service: ValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test matchCheck method', () => {
    it('should return null if values are the same', () => {
      expect(service.matchCheck('test', 'test')).toBeNull()
    });

    it('should return { isMatching: true } if values are different', () => {
      expect(service.matchCheck('test', 'test2')).toEqual({ isMatching: true })
    });
  });

  describe('test substringCheck method', () => {
    it('should return null if first argument is empty string', () => {
      expect(service.substringCheck('', 'test', 'firstName')).toBeNull()
    });
    it('should return null if second argument is empty string', () => {
      expect(service.substringCheck('qwerty', '', 'firstName')).toBeNull()
    });
    it('should return null if first argument is undefined', () => {
      expect(service.substringCheck(undefined, 'test', 'firstName')).toBeNull()
    });
    it('should return null if second argument is undefined', () => {
      expect(service.substringCheck('qwerty', undefined, 'firstName')).toBeNull()
    });
    it('should return null if values string doesnt consists substring', () => {
      expect(service.substringCheck('qwerty', 'test', 'firstName')).toBeNull()
    });

    it('should return { secondName: true } string consist substring', () => {
      expect(service.substringCheck('testing', 'test', 'secondName')).toEqual({ secondName: true })
    });
  });
});
