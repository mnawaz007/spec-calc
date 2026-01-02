/**
 * API Service Tests
 *
 * Tests the API client service with:
 * - Successful calculations
 * - Error handling
 * - Network failures
 * - Health checks
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import { calculateAPI, checkAPIHealth, getAPIURL } from './api';

// Mock axios
vi.mock('axios');

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset environment variables
    process.env.VITE_API_URL = 'http://localhost:5000/api';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getAPIURL()', () => {
    it('should return the API URL from environment', () => {
      const url = getAPIURL();
      expect(url).toBe('http://localhost:5000/api');
    });

    it('should use VITE_API_URL environment variable', () => {
      process.env.VITE_API_URL = 'http://custom-api:3000/api';
      const url = getAPIURL();
      expect(url).toBe('http://custom-api:3000/api');
    });
  });

  describe('calculateAPI()', () => {
    it('should perform addition calculation', async () => {
      axios.post.mockResolvedValue({
        data: { result: 8 }
      });

      const result = await calculateAPI(5, 3, '+');

      expect(result).toEqual({ result: 8 });
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5000/api/calculate',
        {
          operand1: 5,
          operand2: 3,
          operator: '+'
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
    });

    it('should perform subtraction calculation', async () => {
      axios.post.mockResolvedValue({
        data: { result: 2 }
      });

      const result = await calculateAPI(5, 3, '−');

      expect(result).toEqual({ result: 2 });
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5000/api/calculate',
        {
          operand1: 5,
          operand2: 3,
          operator: '−'
        },
        expect.any(Object)
      );
    });

    it('should perform multiplication calculation', async () => {
      axios.post.mockResolvedValue({
        data: { result: 15 }
      });

      const result = await calculateAPI(5, 3, '×');

      expect(result).toEqual({ result: 15 });
    });

    it('should perform division calculation', async () => {
      axios.post.mockResolvedValue({
        data: { result: 5 }
      });

      const result = await calculateAPI(20, 4, '÷');

      expect(result).toEqual({ result: 5 });
    });

    it('should handle decimal operands', async () => {
      axios.post.mockResolvedValue({
        data: { result: 6.25 }
      });

      const result = await calculateAPI(2.5, 3.75, '+');

      expect(result).toEqual({ result: 6.25 });
      expect(axios.post).toHaveBeenCalledWith(
        expect.any(String),
        {
          operand1: 2.5,
          operand2: 3.75,
          operator: '+'
        },
        expect.any(Object)
      );
    });

    it('should handle negative operands', async () => {
      axios.post.mockResolvedValue({
        data: { result: -2 }
      });

      const result = await calculateAPI(-5, 3, '+');

      expect(result).toEqual({ result: -2 });
    });

    it('should send correct API endpoint URL', async () => {
      axios.post.mockResolvedValue({
        data: { result: 8 }
      });

      await calculateAPI(5, 3, '+');

      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5000/api/calculate',
        expect.any(Object),
        expect.any(Object)
      );
    });

    it('should send JSON content type header', async () => {
      axios.post.mockResolvedValue({
        data: { result: 8 }
      });

      await calculateAPI(5, 3, '+');

      expect(axios.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        { headers: { 'Content-Type': 'application/json' } }
      );
    });
  });

  describe('Error Handling', () => {
    it('should handle division by zero error', async () => {
      axios.post.mockRejectedValue({
        response: {
          status: 400,
          data: { error: 'Division by zero is not allowed' }
        }
      });

      const error = await calculateAPI(10, 0, '÷').catch(err => err);

      expect(error.response.data.error).toBe('Division by zero is not allowed');
      expect(error.response.status).toBe(400);
    });

    it('should handle invalid input error', async () => {
      axios.post.mockRejectedValue({
        response: {
          status: 400,
          data: { error: 'Invalid input: Both operands are required.' }
        }
      });

      const error = await calculateAPI('abc', 3, '+').catch(err => err);

      expect(error.response.status).toBe(400);
      expect(error.response.data.error).toContain('Invalid input');
    });

    it('should handle invalid operator error', async () => {
      axios.post.mockRejectedValue({
        response: {
          status: 400,
          data: { error: 'Invalid operator. Supported operators are: +, −, ×, ÷' }
        }
      });

      const error = await calculateAPI(5, 3, '%').catch(err => err);

      expect(error.response.status).toBe(400);
    });

    it('should handle missing operand error', async () => {
      axios.post.mockRejectedValue({
        response: {
          status: 400,
          data: { error: 'operand1 is required' }
        }
      });

      const error = await calculateAPI(null, 3, '+').catch(err => err);

      expect(error.response.status).toBe(400);
    });

    it('should handle network error', async () => {
      axios.post.mockRejectedValue({
        message: 'Network Error',
        code: 'ECONNREFUSED'
      });

      const error = await calculateAPI(5, 3, '+').catch(err => err);

      expect(error.code).toBe('ECONNREFUSED');
    });

    it('should handle server error (500)', async () => {
      axios.post.mockRejectedValue({
        response: {
          status: 500,
          data: { error: 'Internal server error' }
        }
      });

      const error = await calculateAPI(5, 3, '+').catch(err => err);

      expect(error.response.status).toBe(500);
    });

    it('should handle timeout errors', async () => {
      axios.post.mockRejectedValue({
        code: 'ECONNABORTED',
        message: 'timeout of 5000ms exceeded'
      });

      const error = await calculateAPI(5, 3, '+').catch(err => err);

      expect(error.code).toBe('ECONNABORTED');
    });

    it('should handle malformed response', async () => {
      axios.post.mockRejectedValue({
        response: {
          status: 200,
          data: null // Invalid response
        }
      });

      const error = await calculateAPI(5, 3, '+').catch(err => err);

      expect(error.response.data).toBeNull();
    });
  });

  describe('checkAPIHealth()', () => {
    it('should check health endpoint and return healthy status', async () => {
      axios.get.mockResolvedValue({
        data: { status: 'healthy' }
      });

      const health = await checkAPIHealth();

      expect(health).toEqual({ status: 'healthy' });
      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:5000/api/health' || 'http://localhost:5000/health'
      );
    });

    it('should return false when API is unreachable', async () => {
      axios.get.mockRejectedValue({
        code: 'ECONNREFUSED'
      });

      const health = await checkAPIHealth().catch(err => err);

      expect(health.code).toBe('ECONNREFUSED');
    });

    it('should return false when health check fails', async () => {
      axios.get.mockRejectedValue({
        response: {
          status: 500
        }
      });

      const health = await checkAPIHealth().catch(err => err);

      expect(health.response.status).toBe(500);
    });

    it('should handle network timeout on health check', async () => {
      axios.get.mockRejectedValue({
        code: 'ECONNABORTED'
      });

      const health = await checkAPIHealth().catch(err => err);

      expect(health.code).toBe('ECONNABORTED');
    });
  });

  describe('Request Format', () => {
    it('should send operands as numbers', async () => {
      axios.post.mockResolvedValue({
        data: { result: 8 }
      });

      await calculateAPI(5, 3, '+');

      const [, payload] = axios.post.mock.calls[0];
      expect(typeof payload.operand1).toBe('number');
      expect(typeof payload.operand2).toBe('number');
      expect(payload.operand1).toBe(5);
      expect(payload.operand2).toBe(3);
    });

    it('should send operator as string', async () => {
      axios.post.mockResolvedValue({
        data: { result: 8 }
      });

      await calculateAPI(5, 3, '+');

      const [, payload] = axios.post.mock.calls[0];
      expect(typeof payload.operator).toBe('string');
      expect(payload.operator).toBe('+');
    });

    it('should not include extra fields in request', async () => {
      axios.post.mockResolvedValue({
        data: { result: 8 }
      });

      await calculateAPI(5, 3, '+');

      const [, payload] = axios.post.mock.calls[0];
      expect(Object.keys(payload).length).toBe(3);
      expect(Object.keys(payload)).toEqual(['operand1', 'operand2', 'operator']);
    });
  });

  describe('Response Handling', () => {
    it('should return result directly from response', async () => {
      axios.post.mockResolvedValue({
        data: { result: 8 }
      });

      const result = await calculateAPI(5, 3, '+');

      expect(result).toHaveProperty('result');
      expect(result.result).toBe(8);
    });

    it('should handle response with error field', async () => {
      axios.post.mockRejectedValue({
        response: {
          status: 400,
          data: { error: 'Invalid input' }
        }
      });

      const error = await calculateAPI(5, 3, '+').catch(err => err);

      expect(error.response.data).toHaveProperty('error');
    });

    it('should handle large number results', async () => {
      axios.post.mockResolvedValue({
        data: { result: 999999999999 }
      });

      const result = await calculateAPI(999999999, 999, '×');

      expect(result.result).toBe(999999999999);
    });

    it('should handle decimal results from division', async () => {
      axios.post.mockResolvedValue({
        data: { result: 3.3333333333 }
      });

      const result = await calculateAPI(10, 3, '÷');

      expect(result.result).toBe(3.3333333333);
    });

    it('should handle negative results', async () => {
      axios.post.mockResolvedValue({
        data: { result: -2 }
      });

      const result = await calculateAPI(3, 5, '−');

      expect(result.result).toBe(-2);
    });

    it('should handle zero result', async () => {
      axios.post.mockResolvedValue({
        data: { result: 0 }
      });

      const result = await calculateAPI(5, 5, '−');

      expect(result.result).toBe(0);
    });
  });

  describe('Concurrent Requests', () => {
    it('should handle multiple simultaneous requests', async () => {
      axios.post.mockResolvedValue({
        data: { result: 8 }
      });

      const request1 = calculateAPI(5, 3, '+');
      const request2 = calculateAPI(10, 7, '−');
      const request3 = calculateAPI(6, 4, '×');

      const [result1, result2, result3] = await Promise.all([request1, request2, request3]);

      expect(result1.result).toBe(8);
      expect(result2.result).toBe(8);
      expect(result3.result).toBe(8);
      expect(axios.post).toHaveBeenCalledTimes(3);
    });
  });
});
